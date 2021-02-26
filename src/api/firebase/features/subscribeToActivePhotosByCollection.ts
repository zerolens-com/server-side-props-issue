import { db, FIREBASE_INDICES } from "@services/firebase";
import { Photo } from "@types/models";

import parseDocsToPhotos from "../utils/parseDocsToPhotos";

async function subscribeToActivePhotosByCollection(
  uidOrOid: string,
  subCollection: string,
  isForOrganization: boolean,
  callback: (photos: Photo[]) => void
) {
  const collection = isForOrganization
    ? FIREBASE_INDICES.ORGANIZATION
    : FIREBASE_INDICES.USER;

  await db
    .collection(collection)
    .doc(uidOrOid)
    .collection(subCollection)
    .onSnapshot((snapshot) => {
      const photosWithMeta = parseDocsToPhotos(snapshot.docs);
      const { photos } = photosWithMeta;
      callback(photos);
    });
}

export default subscribeToActivePhotosByCollection;
