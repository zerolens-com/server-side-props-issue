import { NotificationPayload } from "@models/notifications/types";
import { db, FIREBASE_INDICES } from "@services/firebase";
import { AppNotification } from "@types/models";

import parseDocsToNotifications from "../utils/parseDocsToNotifications";

async function getUnreadNotifications(
  uid: string,
  callback: (notifications: AppNotification[]) => void
): Promise<void> {
  await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_INDICES.NOTIFICATIONS)
    .where("status", "==", "unread")
    // .where("isLive", "==", isLive)
    .orderBy("createdAt", "desc")
    .limit(9) // TODO refactor constant
    .onSnapshot((docs) => {
      const notificationsPayload: NotificationPayload = parseDocsToNotifications(
        docs
      );
      callback(notificationsPayload.notifications);
    });
}

export default getUnreadNotifications;
