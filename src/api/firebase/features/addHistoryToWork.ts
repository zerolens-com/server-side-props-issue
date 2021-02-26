import { WorkHistory } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";

async function addHistoryToWork(
  uid: string,
  workId: string,
  data: WorkHistory
): Promise<boolean> {
  try {
    await db
      .collection(FIREBASE_INDICES.USER)
      .doc(uid)
      .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
      .doc(workId)
      .collection(FIREBASE_USERS_SUBCOLLECTIONS.HISTORY)
      .add(data);
  } catch (error) {
    console.log("error adding work", error);
  }

  return true;
}

export default addHistoryToWork;
