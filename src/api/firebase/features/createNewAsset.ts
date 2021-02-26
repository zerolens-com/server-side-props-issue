import { Asset } from "@models/assets/type";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_ORGANIZATION_SUBCOLLECTIONS,
  serverTime,
} from "@services/firebase";

async function createNewAsset(
  oid: string,
  asset: Partial<Asset>
): Promise<Partial<Asset>> {
  asset.createdAt = serverTime;
  const assetRef = await db
    .collection(FIREBASE_INDICES.ORGANIZATION)
    .doc(oid)
    .collection(FIREBASE_ORGANIZATION_SUBCOLLECTIONS.ASSETS)
    .add(asset);

  const assetDB = await assetRef.get();
  const assetId = assetDB.id;

  const storageRef = `${FIREBASE_INDICES.ORGANIZATION.toUpperCase()}/${oid}/${FIREBASE_ORGANIZATION_SUBCOLLECTIONS.ASSETS.toLowerCase()}/${
    asset.name
  }`;
  assetRef.update({ storageRef });

  asset.storageRef = storageRef;

  return asset;
}

export default createNewAsset;
