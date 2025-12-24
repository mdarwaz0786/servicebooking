import SupportContent from "../../models/support.model.js";
import ApiError from "../../helpers/apiError.js";
import asyncHandler from "../../helpers/asyncHandler.js";

export const upsertSupportContent = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { faqs, supportInfo } = req.body;

  if (!faqs && !supportInfo) {
    throw new ApiError(400, "Nothing to update");
  }

  let content = await SupportContent.findOne();

  if (!content) {
    content = await SupportContent.create({
      faqs,
      supportInfo,
      createdBy: userId,
      updatedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Support content created successfully",
      data: content,
    });
  }

  if (faqs) content.faqs = faqs;
  if (supportInfo) content.supportInfo = supportInfo;

  content.updatedBy = userId;
  await content.save();

  return res.status(200).json({
    success: true,
    message: "Support content updated successfully",
    data: content,
  });
});

// Dummy Support Content
const dummyData = {
  faqs: [
    {
      id: "1",
      question: "How do I update my service rates?",
      answer:
        "Go to Profile → My Services → Edit Service Rates. You can update rates for each service individually.",
    },
    {
      id: "2",
      question: "Why is my withdrawal pending?",
      answer:
        "Withdrawals take 2-3 business days to process. Make sure your bank details are verified in your profile.",
    },
    {
      id: "3",
      question: "How can I get more bookings?",
      answer:
        "Complete your profile, maintain good ratings, and be available during peak hours. Consider adding more services.",
    },
    {
      id: "4",
      question: "What if I need to cancel a booking?",
      answer:
        'Go to the booking details and click "Cancel". Please inform the customer and provide a valid reason.',
    },
    {
      id: "5",
      question: "How do I contact customer support?",
      answer:
        "You can contact us via phone, email, WhatsApp, or submit a support ticket through this screen.",
    },
  ],
  supportInfo: {
    workingHours: "24/7 Support Available",
    quickResponseHours: "9 AM - 6 PM",
    officeName: "ServiceProvider Pvt. Ltd.",
    address: "123 Business Street, Delhi, India - 110001",
    email: "support@serviceprovider.com",
    phone: "+91 98765 43210",
    channels: "Email, Phone, WhatsApp, Live Chat",
  },
  call: {
    id: 'call',
    label: 'Call Support',
    icon: 'phone',
    value: '+919876543210',
    type: 'phone',
  },
  email: {
    id: 'email',
    label: 'Email Us',
    icon: 'email',
    value: 'support@serviceprovider.com',
    type: 'email',
  },
  whatsapp: {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'whatsapp',
    value: '+919876543210',
    type: 'whatsapp',
  }
};

export const getSupportContent = asyncHandler(async (req, res) => {
  const content = await SupportContent.findOne().lean();

  return res.status(200).json({
    success: true,
    data: content || dummyData,
    source: content ? "database" : "default",
  });
});
