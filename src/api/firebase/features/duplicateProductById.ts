import { db, FIREBASE_INDICES } from "@services/firebase";
import { ZerolensProduct } from "@types/models";

async function duplicateProductById(id: string): Promise<ZerolensProduct> {
  const response = await db.collection(FIREBASE_INDICES.PRODUCTS).doc(id).get();
  const currProduct = response.data();
  currProduct.name = `${currProduct.name} (copy)`;
  currProduct.createdAt = new Date().toISOString();

  const newProductResponse = await db
    .collection(FIREBASE_INDICES.PRODUCTS)
    .add(currProduct);
  currProduct.recommendedColors = currProduct.reccomendedColors ?? [];
  currProduct.id = newProductResponse.id;
  delete currProduct.reccomendedColors;
  return currProduct as ZerolensProduct;
}

export default duplicateProductById;
