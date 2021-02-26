import { Asset } from "@models/assets/type";
import { Work } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";

async function updateWorkHistoryByIdAndUid(
  uid: string,
  workId: string,
  work: Partial<Work>
): Promise<void> {
  const historyRef = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .doc(workId)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.HISTORY)
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  historyRef?.docs[0]?.ref?.update(work);
  await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .doc(workId)
    .update(work);
}

export default updateWorkHistoryByIdAndUid;
