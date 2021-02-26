import { ZerolensProduct } from "@types/models";
import { db, FIREBASE_INDICES } from "@services/firebase";
import parseDataToProduct from "@api/firebase/utils/parseDataToProduct";
import parseProductPartialToDBFormat from "@api/firebase/utils/parseProductPartialToDBFormat";

async function updateProductFeature(
  pid: string,
  updateValue: Partial<ZerolensProduct>
): Promise<ZerolensProduct> {
  await db
    .collection(FIREBASE_INDICES.PRODUCTS)
    .doc(pid)
    .update(parseProductPartialToDBFormat(updateValue));

  const response = await db
    .collection(FIREBASE_INDICES.PRODUCTS)
    .doc(pid)
    .get();

  const product = parseDataToProduct(response);
  return product;
}

export default updateProductFeature;
