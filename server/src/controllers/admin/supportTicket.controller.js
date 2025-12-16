import SupportTicketModel from "../../models/supportTicket.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";
import compressImage from "../../helpers/compressImage.js";
import fs from "fs";
import path from "path";

export const createSupportTicket = asyncHandler(async (req, res) => {
  const {
    name,
    userType,
    mobile,
    subject,
    priority,
    description,
  } = req.body;

  if (!name?.trim()) throw new ApiError(400, "Name is required");
  if (!userType) throw new ApiError(400, "User type is required");
  if (!subject?.trim()) throw new ApiError(400, "Subject is required");

  let imagePath = null;

  try {
    if (req.files?.image?.[0]) {
      imagePath = await compressImage(req.files.image[0].buffer, "support");
    };

    let ticket = await SupportTicketModel.create({
      name,
      mobile,
      subject,
      userType,
      priority,
      description,
      image: imagePath,
    });

    const slug = await generateUniqueSlug(
      subject,
      "SupportTicket",
      ticket?._id,
      "support-tickets"
    );

    ticket.slug = slug;
    await ticket.save();

    return res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    if (imagePath && fs.existsSync(path.join(process.cwd(), imagePath))) {
      fs.unlinkSync(path.join(process.cwd(), imagePath));
    };
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getSupportTickets = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit, priority, userType } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const filters = {};

  if (search) {
    filters.$or = [
      { ticketNumber: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } }
    ];
  }

  if (priority) filters.priority = priority;
  if (userType) filters.userType = userType;

  const sortOption = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  const tickets = await SupportTicketModel.find(filters)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await SupportTicketModel.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    total,
    page,
    limit,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    data: tickets,
    pagination: buildPagination({ page, limit, total })
  });
});

export const getSupportTicketById = asyncHandler(async (req, res) => {
  const ticket = await SupportTicketModel.findById(req.params.id);

  if (!ticket) throw new ApiError(404, "Support ticket not found");

  return res.status(200).json({ success: true, data: ticket });
});

export const updateSupportTicket = asyncHandler(async (req, res) => {
  const {
    reply,
    scheduleTicket,
    ticketStatus,
    status,
  } = req.body;

  const ticket = await SupportTicketModel.findById(req.params.id);
  if (!ticket) throw new ApiError(404, "Support ticket not found");

  if (req.files?.replyImage?.[0]) {
    if (ticket.replyImage && fs.existsSync(path.join(process.cwd(), ticket.replyImage))) {
      fs.unlinkSync(path.join(process.cwd(), ticket.replyImage));
    };
    ticket.replyImage = await compressImage(req.files.replyImage[0].buffer, "support");
  };

  ticket.reply = reply || ticket.reply;
  ticket.ticketStatus = ticketStatus || ticket.ticketStatus;
  ticket.scheduleTicket = scheduleTicket || ticket.scheduleTicket;
  ticket.status = typeof status === "boolean" ? status : ticket.status;

  await ticket.save();

  return res.status(200).json({ success: true, data: ticket });
});

export const deleteSupportTicket = asyncHandler(async (req, res) => {
  const ticket = await SupportTicketModel.findById(req.params.id);
  if (!ticket) throw new ApiError(404, "Support ticket not found");

  await SlugModel.deleteOne({
    collectionName: "SupportTicket",
    documentId: ticket._id
  });

  await ticket.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Support ticket deleted successfully"
  });
});
