import {
  db,
  FIREBASE_INDICES,
  FIREBASE_ORGANIZATION_SUBCOLLECTIONS,
} from "@services/firebase";

export interface DeleteAssetByIdProps {
  oid: string;
  id: string;
}

async function deleteAssetById(oid: string, id: string): Promise<void> {
  await db
    .collection(FIREBASE_INDICES.ORGANIZATION)
    .doc(oid)
    .collection(FIREBASE_ORGANIZATION_SUBCOLLECTIONS.ASSETS)
    .doc(id)
    .delete();
}

export default deleteAssetById;
