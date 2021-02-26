import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import { Asset, AssetsDatabaseReference } from "@models/assets/type";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_ORGANIZATION_SUBCOLLECTIONS,
} from "@services/firebase";

import parseDocsToAssets from "../utils/parseDocsToAssets";

// TODO: use correct type here
async function getAssets(oid: string): Promise<AssetsDatabaseReference> {
  const response = await db
    .collection(FIREBASE_INDICES.ORGANIZATION)
    .doc(oid)
    .collection(FIREBASE_ORGANIZATION_SUBCOLLECTIONS.ASSETS)
    .orderBy("createdAt", "desc")
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME)
    .get();

  if (response.docs.length === 0) {
    return {
      assets: [] as Asset[],
      lastId: null,
      hasMore: false,
      isLoading: false,
    };
  }

  return parseDocsToAssets(response.docs);
}

export default getAssets;
