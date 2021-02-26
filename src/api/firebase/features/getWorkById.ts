import { Work } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";

async function getWorkById(uid: string, workId: string): Promise<Work> {
  const workRef = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .doc(workId)
    .get();

  const workData = workRef.data() as Work;
  return workData;
}

export default getWorkById;
