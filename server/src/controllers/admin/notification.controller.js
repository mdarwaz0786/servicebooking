import Notification from "../../models/notification.model.js";
import User from "../../models/user.model.js";
import firebase from "../../firebase/index.js";

// Send notification
export const createNotification = async (req, res) => {
  try {
    const { user, title, message, role } = req.body;

    if (!message || !role) {
      return res.status(400).json({
        success: false,
        message: "Message and role are required.",
      });
    };

    let fcmTokens = [];
    let userIds = [];

    /* ---------- IF USERS PROVIDED → SEND ONLY THEM ---------- */
    if (user && user.length > 0) {
      const users = await User.find({
        _id: { $in: user },
        role: role,
        fcmToken: { $exists: true, $ne: null },
      });

      fcmTokens = users.map((u) => u?.fcmToken);
      userIds = users.map((u) => u?._id);
    }

    /* ---------- ELSE → SEND TO ALL USERS OF ROLE ---------- */
    else {
      const users = await User.find({
        role: role,
        fcmToken: { $exists: true, $ne: null },
      });

      fcmTokens = users.map((u) => u?.fcmToken);
      userIds = users.map((u) => u?._id);
    };

    if (fcmTokens.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid FCM tokens found.",
      });
    };

    /* ---------- FIREBASE PAYLOAD ---------- */
    const payload = {
      notification: {
        title: title || "GI TEAM",
        body: message,
      },
    };

    /* ---------- SEND PUSH ---------- */
    await Promise.allSettled(fcmTokens.map((token) => firebase.messaging().send({ ...payload, token })));

    /* ---------- SAVE ---------- */
    const newNotification = new Notification({
      user: userIds,
      title,
      message,
      role,
      toAll: !(user && user.length > 0),
    });

    await newNotification.save();

    return res.status(200).json({
      success: true,
      message: "Notification send successfully",
      data: newNotification,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  };
};
