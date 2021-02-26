import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import { GetPhotosReturn } from "@models/photos/types";
import { db, FIREBASE_INDICES } from "@services/firebase";
import { Photo } from "@types/models";

import parseDocsToPhotos from "../utils/parseDocsToPhotos";

async function getPhotos(
  uidOrOid: string,
  isForOrganization = false,
  status = "completed"
): Promise<GetPhotosReturn> {
  const searchProperty = isForOrganization ? "oid" : "uid";
  const currSearchTerm = uidOrOid;

  const response = await db
    .collection(FIREBASE_INDICES.PHOTOS)
    .where(searchProperty, "==", currSearchTerm)
    .where("status", "==", status)
    .orderBy("createdAt", "desc")
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME) // TODO refactor constant
    .get();

  if (response.docs.length === 0) {
    return { photos: [] as Photo[], id: null, hasMore: false };
  }

  return parseDocsToPhotos(response.docs);
}

export default getPhotos;
