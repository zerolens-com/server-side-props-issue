import { Work } from "@models/works/types";
import _ from "lodash";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
  serverTime,
} from "@services/firebase";

// TODO: This needs to be debounced
async function createNewWork(uid: string, work: Partial<Work>): Promise<Work> {
  work.createdAt = serverTime;
  const workRef = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .add(_.omitBy(work, _.isNil));

  const workDB = await workRef.get();
  const currentWork = workDB.data();
  const workId = workDB.id;

  // workRef.update({ storageRef });

  currentWork.id = workId;

  return currentWork as Work;
}

export default createNewWork;
