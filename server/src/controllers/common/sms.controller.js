import { sendSMS } from "../../utils/sms.js";

export const sendSMSToMobile = async (req, res) => {
  try {
    const { mobile, templateId, otp } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile is required",
      });
    };

    if (!templateId) {
      return res.status(400).json({
        success: false,
        message: "TemplateId is required",
      });
    };

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    };

    const result = await sendSMS(mobile, templateId, otp);

    return res.status(200).json({
      success: true,
      message: "SMS sent Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send SMS",
    });
  };
};
