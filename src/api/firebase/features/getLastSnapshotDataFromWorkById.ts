import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";
import { Snapshot } from "@types/models";

async function getLastSnapshotDataFromWorkById(
  workId: string,
  uid: string
): Promise<Snapshot> {
  const historyRef = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .doc(workId)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.HISTORY)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  return historyRef.docs[0].data().data as Snapshot;
}

export default getLastSnapshotDataFromWorkById;
