import { WorkHistory } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_SNAPSHOTS_SUBCOLLECTIONS,
  FIREBASE_USERS_SUBCOLLECTIONS,
  serverTime,
} from "@services/firebase";
import { SnapshotStatus, SnapshotStatusReport, SnapshotStatusType } from "@types/models";



async function addStatusToSnapshot(
  sid: string,
  status: SnapshotStatus,
  type: SnapshotStatusType,
  message: string,
  progress?: number,
  additionalInformation?: string

): Promise<boolean> {

  try {

    const data: SnapshotStatusReport = {
      progress: progress ?? 0,
      status,
      type,
      createdAt: serverTime,
      additionalInformation: additionalInformation ?? "",
      message: message ?? ""
    }

    await db
      .collection(FIREBASE_INDICES.PHOTOS)
      .doc(sid)
      .collection(FIREBASE_SNAPSHOTS_SUBCOLLECTIONS.HISTORY)
      .add(data);
  } catch (error) {
    console.log("error adding Snapshot Status", error);
  }

  return true;
}

export default addStatusToSnapshot;
