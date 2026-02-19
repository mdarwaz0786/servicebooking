import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import firebase from "../firebase/index.js";

const sendNotification = async (
  users = [],
  title = "GI TEAM",
  message,
  role,
  data = {},
) => {
  if (!message || !role) {
    throw new Error("Message and role are required");
  };

  // Convert all data values to string (FCM requirement)
  const payloadData = Object.fromEntries(
    Object.entries(data)?.map(([key, value]) => [
      key,
      value !== undefined && value !== null ? String(value) : "",
    ])
  );

  let userIds = [];

  /* SEND TO SELECTED USERS */
  if (users.length > 0) {
    const foundUsers = await User.find({
      _id: { $in: users },
      role,
      fcmToken: { $exists: true, $ne: null },
    });

    const tokens = foundUsers?.map((u) => u?.fcmToken);
    userIds = foundUsers?.map((u) => u?._id);

    await Promise.allSettled(
      tokens.map((token) =>
        firebase.messaging().send({
          token,
          notification: {
            title,
            body: message,
          },
          "android": {
            "notification": {
              "channel_id": "booking_other_zone"
            }
          },
          data: payloadData,
        })
      )
    );
  }

  /* SEND TO ROLE (TOPIC) */
  else {
    await firebase.messaging().send({
      topic: role,
      notification: {
        title,
        body: message,
      },
      "android": {
        "notification": {
          "channel_id": "booking_other_zone"
        }
      },
      data: payloadData,
    });
  };

  /* SAVE IN DB */
  const notification = await Notification.create({
    user: userIds,
    title,
    message,
    role,
    toAll: users?.length === 0,
    payload: payloadData,
  });

  return notification;
};

export default sendNotification;
