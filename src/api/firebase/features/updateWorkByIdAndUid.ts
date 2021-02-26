import { Work } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";

async function updateWorkByIdAndUid(
  uid: string,
  workId: string,
  data: Work
): Promise<void> {
  const workRef = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .doc(workId)
    .update(data);
}

export default updateWorkByIdAndUid;
