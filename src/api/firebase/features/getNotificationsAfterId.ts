import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import { NotificationPayload } from "@models/notifications/types";
import { db, FIREBASE_INDICES } from "@services/firebase";
import { AppNotification } from "@types/models";

import parseDocsToNotifications from "../utils/parseDocsToNotifications";

async function getNotificationsAfterId(
  lastId: string,
  uid: string
): Promise<NotificationPayload> {
  const response = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_INDICES.NOTIFICATIONS)
    .orderBy("createdAt", "desc")
    .startAfter(lastId)
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME) // TODO refactor constant
    .get();

  if (response.docs.length === 0) {
    return {
      notifications: [] as AppNotification[],
      lastId: null,
      hasMore: false,
    };
  }

  return parseDocsToNotifications(response.docs);
}

export default getNotificationsAfterId;
