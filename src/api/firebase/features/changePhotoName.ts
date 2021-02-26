import { db, FIREBASE_INDICES } from "@services/firebase";

async function changePhotoName(sid: string, name: string): Promise<boolean> {
  await db
    .collection(FIREBASE_INDICES.PHOTOS)
    .doc(sid)
    .update({ "metadata.name": name });

  // eslint-disable-next-line no-use-before-define
  return true;
}

export default changePhotoName;
