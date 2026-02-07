import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const SMS_TEMPLATES = {
  // Login OTP
  "1707175189826818672": {
    name: "login",
    format: (otp) => `${otp} is your Green India Team Account Login verification code. DO NOT SHARE this code with anyone for account safety. www.greenindiateam.com`,
  },

  // Team Verification
  "1707174902097548288": {
    name: "team_verification",
    format: (otp) => `Your Green India Team Verification code is:${otp} visit: https://greenindiateam.com GREIND`,
  },
};

export const sendSMS = async (options = {}) => {
  const mobile = options?.mobile;
  const type = options['type'];

  let templateId = '';
  let message = '';

  if (type == 'otp') {
    const otp = options['otp'];
    templateId = '1707174902097548288';
    message = `Your Green India Team Verification code is:${otp} visit: https://greenindiateam.com GREIND`;
  }
  else if (type == 'bookingComplete') {
    const bookingData = options['bookingData'];
    templateId = '1707174902097548288';
    message = `Your Green India Team Verification code is:${otp} visit: https://greenindiateam.com GREIND`;
  }

  if (!mobile) {
    throw new Error("Mobile is required");
  };

  if (!templateId) {
    throw new Error("TemplateId is required");
  };

  if (!otp) {
    throw new Error("OTP is required");
  };

  const template = SMS_TEMPLATES[templateId];

  if (!template) {
    throw new Error("Invalid SMS Template ID");
  };

  // const message = template.format(otp);

  const smsUrl =
    `${process.env.SMS_API_URL}` +
    `?username=${encodeURIComponent(process.env.SMS_USERNAME)}` +
    `&apikey=${encodeURIComponent(process.env.SMS_APIKEY)}` +
    `&apirequest=Text` +
    `&sender=${encodeURIComponent(process.env.SMS_SENDER)}` +
    `&mobile=${encodeURIComponent(mobile)}` +
    `&message=${encodeURIComponent(message)}` +
    `&route=${encodeURIComponent(process.env.SMS_ROUTE)}` +
    `&TemplateID=${encodeURIComponent(templateId)}` +
    `&format=JSON`;

  try {
    const response = await axios.get(smsUrl, {
      httpsAgent,
      timeout: 10000
    });
    return response?.data;
  } catch (error) {
    console.log("SMS Error:", error?.response?.data || error.message);
    throw error;
  };
};

