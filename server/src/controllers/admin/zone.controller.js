import Zone from "../../models/zone.model.js";
import { buildPagination } from "../../utils/pagination.js";

export const createZone = async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Zone name is required" });
    };

    if (!coordinates?.length) {
      return res.status(400).json({ message: "Coordinates are required" });
    };

    const zone = await Zone.create({
      name,
      geometry: {
        type: "Polygon",
        coordinates: [coordinates]
      },
    });

    res.status(201).json({ success: true, message: "Created successfully", data: zone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  };
};

export const getZones = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      status
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (status !== undefined) {
      query.status = status === "true";
    }

    const skip = (page - 1) * limit;

    const [zones, total] = await Promise.all([
      Zone.find(query)
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      Zone.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      message: "Data fetched successfully",
      total,
      page,
      limit,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      data: zones,
      pagination: buildPagination({ page, limit, total })
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ message: "Zone not found" });
    }

    res.json({ success: true, message: "Data fetched successfully", data: zone });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateZone = async (req, res) => {
  try {
    const { name, coordinates, status } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (typeof status === "boolean") updateData.status = status;

    if (coordinates?.length) {
      updateData.geometry = {
        type: "Polygon",
        coordinates: [coordinates]
      };
    }

    const zone = await Zone.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!zone) {
      return res.status(404).json({ success: false, message: "Zone not found" });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      data: zone
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteZone = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);

    if (!zone) {
      return res.status(404).json({ success: false, message: "Zone not found" });
    }

    res.json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


