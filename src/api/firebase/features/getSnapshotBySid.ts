import { db, FIREBASE_INDICES } from "@services/firebase";
import { Snapshot } from "@types/models";

async function getSnapshotBySid(sid: string): Promise<Snapshot> {
  const response = await db.collection(FIREBASE_INDICES.PHOTOS).doc(sid).get();
  return response.data() as Snapshot;
}

export default getSnapshotBySid;
