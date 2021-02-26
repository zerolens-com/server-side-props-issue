import { db, FIREBASE_INDICES } from "@services/firebase";
import { ZerolensProduct } from "@types/models";

async function getProductById(id: string): Promise<ZerolensProduct> {
  const response = await db.collection(FIREBASE_INDICES.PRODUCTS).doc(id).get();
  const currProduct = response.data();
  currProduct.recommendedColors = currProduct.reccomendedColors;
  currProduct.id = id;
  delete currProduct.reccomendedColors;
  return currProduct as ZerolensProduct;
}

export default getProductById;
