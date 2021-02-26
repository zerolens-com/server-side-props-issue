import { db, FIREBASE_INDICES } from "@services/firebase";
import { Photo } from "@types/models";

import parseDocsToPhotos from "../utils/parseDocsToPhotos";

async function getPhotoById(sid: string): Promise<Photo> {
  const response = await db.collection(FIREBASE_INDICES.PHOTOS).doc(sid).get();
  const photoData = [response];
  return parseDocsToPhotos(photoData).photos[0];
}

export default getPhotoById;
