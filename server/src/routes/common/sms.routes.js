import express from "express";
import { sendSMSToMobile } from "../../controllers/common/sms.controller.js";

const router = express.Router();

router.post("/", sendSMSToMobile);

export default router;
