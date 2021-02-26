import { db, FIREBASE_INDICES } from "@services/firebase";
import { GetPhotosReturn } from "@models/photos/types";
import { Photo } from "@types/models";
import parseDocsToPhotos from "@api/firebase/utils/parseDocsToPhotos";
import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";

async function getPhotosAfterId(
  lastId: string,
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
    .startAfter(lastId)
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME)
    .get();

  if (response.docs.length === 0) {
    return { photos: [] as Photo[], id: lastId, hasMore: false };
  }
  return parseDocsToPhotos(response.docs);
}

export default getPhotosAfterId;
