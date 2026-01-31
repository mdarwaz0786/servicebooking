import Notification from "../../models/notification.model.js";
import User from "../../models/user.model.js";
import firebase from "../../firebase/index.js";

export const createNotification = async (req, res) => {
  try {
    const { user, title, message, role } = req.body;

    if (!message || !role) {
      return res.status(400).json({
        success: false,
        message: "Message and role are required",
      });
    };

    let userIds = [];

    /* SEND TO SELECTED USERS (TOKEN) */
    if (user && user.length > 0) {

      const users = await User.find({
        _id: { $in: user },
        role,
        fcmToken: { $exists: true, $ne: null },
      });

      if (!users.length) {
        return res.status(400).json({
          success: false,
          message: "Fcm token not found for selected user",
        });
      };

      const tokens = users?.map((u) => u?.fcmToken);
      userIds = users?.map((u) => u?._id);

      await Promise.allSettled(
        tokens.map((token) =>
          firebase.messaging().send({
            token,
            notification: {
              title: title || "GI TEAM",
              body: message,
            },
          })
        )
      );
    }

    /*  SEND TO ROLE USING TOPIC */
    else {
      await firebase.messaging().send({
        topic: role, // "user" OR "serviceman"
        notification: {
          title: title || "GI TEAM",
          body: message,
        },
      });
    };

    /* SAVE IN DB */
    const notification = await Notification.create({
      user: userIds,
      title,
      message,
      role,
      toAll: !(user && user.length > 0),
    });

    return res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      data: notification,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  };
};
