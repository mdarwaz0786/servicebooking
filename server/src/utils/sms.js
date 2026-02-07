import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const sendSMS = async (options = {}) => {
  const mobile = options?.mobile;
  const type = options?.type;
  const otp = options?.otp;

  if (!mobile) {
    throw new Error("Mobile is required");
  };

  if (!type) {
    throw new Error("Type is required");
  };

  let templateId = '';
  let message = '';

  if (type == 'login') {
    templateId = '1707175189826818672';
    message = `${otp} is your Green India Team Account Login verification code. DO NOT SHARE this code with anyone for account safety. www.greenindiateam.com`;
  } else if (type == "teamVerification") {
    templateId = '1707174902097548288';
    message = `Your Green India Team Verification code is:${otp} visit: https://greenindiateam.com GREIND`;
  };

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

