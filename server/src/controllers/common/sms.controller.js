import { sendSMS } from "../../utils/sms.js";

export const sendSMSToMobile = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile is required",
      });
    };

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const options = {
      mobile: mobile,
      otp: otp,
      type: "login",
    };

    const result = await sendSMS(options);

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
