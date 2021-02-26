import { FIREBASE_INDICES, db } from "@services/firebase";
import { ImageLocation, UpdateSnapshotPreviewParams } from "@types/models";

async function updateSnapshotSignedUrl({
  snapshotId,
  path,
  signedUrl,
}: UpdateSnapshotPreviewParams): Promise<void> {
  const payload: ImageLocation = {
    signedURL: signedUrl,
    path,
    fileExtension: "jpg",
    createdAt: new Date(),
  };
  const response = await db
    .collection(FIREBASE_INDICES.PHOTOS)
    .doc(snapshotId)
    .update({ preview: payload });

  return response;
}

export default updateSnapshotSignedUrl;
