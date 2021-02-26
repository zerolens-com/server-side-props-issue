import {
  ZerolensObjectTypes,
  ZerolensObjectStatus,
  AppNotification,
} from "@types/models";

const parseDataToNotification = (
  doc: firebase.firestore.DocumentData
): AppNotification => {
  const notification: AppNotification = {
    id: doc.id,
    type: doc.data().type || undefined,
    createdAt: doc.data().createdAt,
    message: doc.data().message,
    url: doc.data().url || undefined,
    iconUrl: doc.data().iconUrl,
    status: doc.data().status,
  };
  return notification;
};

export default parseDataToNotification;
