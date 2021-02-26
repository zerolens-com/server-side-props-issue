import { db, FIREBASE_INDICES } from "@services/firebase";

async function markNotificationAsRead(uid: string, notificationId: string) {
  await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_INDICES.NOTIFICATIONS)
    // .where("isLive", "==", isLive)
    .doc(notificationId)
    .update({ status: "read" });
}

export default markNotificationAsRead;
