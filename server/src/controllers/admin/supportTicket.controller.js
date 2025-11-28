import SupportTicketModel from "../../models/supportTicket.model.js";
import SlugModel from "../../models/slug.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";
import { generateUniqueSlug } from "../../helpers/generateUniqueSlug.js";
import { buildPagination } from "../../utils/pagination.js";

export const createSupportTicket = asyncHandler(async (req, res) => {
  const {
    ticketNumber,
    name,
    role,
    mobile,
    subject,
    priority,
    description,
    scheduleTicket
  } = req.body;

  if (!ticketNumber?.trim()) throw new ApiError(400, "Ticket number is required");
  if (!name?.trim()) throw new ApiError(400, "Name is required");
  if (!role) throw new ApiError(400, "Role is required");
  if (!mobile?.trim()) throw new ApiError(400, "Mobile is required");
  if (!subject?.trim()) throw new ApiError(400, "Subject is required");
  if (!description?.trim()) throw new ApiError(400, "Description is required");

  const image = req.files?.image?.[0] ? req.files.image[0].path : null;
  const replyImage = req.files?.replyImage?.[0] ? req.files.replyImage[0].path : null;

  let ticket = await SupportTicketModel.create({
    ticketNumber,
    name,
    role,
    mobile,
    subject,
    priority,
    description,
    scheduleTicket,
    image,
    replyImage
  });

  const slug = await generateUniqueSlug(
    ticketNumber,
    "SupportTicket",
    ticket._id,
    "support-tickets"
  );

  ticket.slug = slug;
  await ticket.save();

  return res.status(201).json({ success: true, data: ticket });
});

export const getSupportTickets = asyncHandler(async (req, res) => {
  let { search, sort = "desc", page, limit, priority, role } = req.query;

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
  if (role) filters.role = role;

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
    ticketNumber,
    name,
    role,
    mobile,
    subject,
    priority,
    description,
    reply,
    scheduleTicket
  } = req.body;

  const ticket = await SupportTicketModel.findById(req.params.id);
  if (!ticket) throw new ApiError(404, "Support ticket not found");

  if (ticketNumber && ticketNumber !== ticket.ticketNumber) {
    await SlugModel.deleteOne({
      collectionName: "SupportTicket",
      documentId: ticket._id
    });

    const newSlug = await generateUniqueSlug(
      ticketNumber,
      "SupportTicket",
      ticket._id,
      "support-tickets"
    );

    ticket.slug = newSlug;
  }

  const image = req.files?.image?.[0] ? req.files.image[0].path : ticket.image;
  const replyImage = req.files?.replyImage?.[0]
    ? req.files.replyImage[0].path
    : ticket.replyImage;

  ticket.ticketNumber = ticketNumber || ticket.ticketNumber;
  ticket.name = name || ticket.name;
  ticket.role = role || ticket.role;
  ticket.mobile = mobile || ticket.mobile;
  ticket.subject = subject || ticket.subject;
  ticket.priority = priority || ticket.priority;
  ticket.description = description || ticket.description;
  ticket.reply = reply || ticket.reply;
  ticket.scheduleTicket = typeof scheduleTicket === "boolean" ? scheduleTicket : ticket.scheduleTicket;

  ticket.image = image;
  ticket.replyImage = replyImage;

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
