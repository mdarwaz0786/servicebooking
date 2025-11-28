import express from "express";
import {
  createSupportTicket,
  getSupportTickets,
  getSupportTicketById,
  updateSupportTicket,
  deleteSupportTicket
} from "../../controllers/admin/supportTicket.controller.js";

import upload from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "replyImage", maxCount: 1 }
  ]),
  createSupportTicket
);

router.get("/", getSupportTickets);
router.get("/:id", getSupportTicketById);

router.patch(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "replyImage", maxCount: 1 }
  ]),
  updateSupportTicket
);

router.delete("/:id", deleteSupportTicket);

export default router;
