import { ZerolensProduct, AppNotification } from "@types/models";
import { ProductsDatabaseReference } from "@models/products/types";
import { NotificationPayload } from "@models/notifications/types";
import parseDataToNotification from "./parseDataToNotification";

const parseDocsToNotifications = (
  docs: firebase.firestore.DocumentSnapshot[] | firebase.firestore.QuerySnapshot
): NotificationPayload => {
  const notifications = [] as AppNotification[];
  docs.forEach((doc) => {
    const notification = parseDataToNotification(doc);
    notifications.push(notification);
  });

  return {
    notifications,
    lastId: docs.length > 0 ? docs[docs.length - 1] : undefined,
    hasMore: true,
  };
};

export default parseDocsToNotifications;
