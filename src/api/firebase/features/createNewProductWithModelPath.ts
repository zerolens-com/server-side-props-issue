import { db, FIREBASE_INDICES } from "@services/firebase";

export interface CreateProductParams {
  oid: string;
  modelPath: string;
  modelName: string;
}

// TODO: Add better Product type
async function createNewProductWithModelPath({
  oid,
  modelPath,
  modelName,
}: CreateProductParams): Promise<{
  docId: string;
  data: any;
}> {
  const docRef = await db.collection(FIREBASE_INDICES.PRODUCTS).add({
    assetbundle: modelPath,
    oid,
    name: modelName,
    loadingtype: modelName.split(".").slice(-1)[0],
    createdAt: new Date(),
    type: "Products",
    status: "setup",
  });

  const docId = docRef.id;
  const doc = await docRef.get();
  const docData = doc.data();
  return { docId, data: docData };
}

export default createNewProductWithModelPath;
