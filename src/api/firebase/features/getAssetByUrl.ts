import {
  db,
  FIREBASE_INDICES,
  FIREBASE_ORGANIZATION_SUBCOLLECTIONS,
} from "@services/firebase";
import { Asset } from "@models/assets/type";
import parseDocsToAssets from "../utils/parseDocsToAssets";

async function getAssetByUrl(url: string, oid: string): Promise<Asset> {
  const response = await db
    .collection(FIREBASE_INDICES.ORGANIZATION)
    .doc(oid)
    .collection(FIREBASE_ORGANIZATION_SUBCOLLECTIONS.ASSETS)
    .where("url", "==", url)
    .get();

  if (response.docs.length === 0) {
    return undefined;
  }

  const docs = parseDocsToAssets(response.docs);
  const asset = docs.assets[0];
  return asset;
}

export default getAssetByUrl;
