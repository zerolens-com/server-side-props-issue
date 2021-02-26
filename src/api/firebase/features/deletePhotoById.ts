import { db, FIREBASE_INDICES } from "@services/firebase";

async function deletePhotoById(sid: string): Promise<void> {
  await db
    .collection(FIREBASE_INDICES.PHOTOS)
    .doc(sid)
    .update({ status: "deleted" });
}

export default deletePhotoById;
