import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import { ProductsDatabaseReference } from "@models/products/types";
import { db, FIREBASE_INDICES } from "@services/firebase";
import { ZerolensProduct } from "@types/models";

import parseDocsToProducts from "../utils/parseDocsToProducts";

async function getProductsAfterId(
  lastId: FirebaseFirestore.DocumentReference,
  oid: string,
  isLive: boolean
): Promise<ProductsDatabaseReference> {
  const response = await db
    .collection(FIREBASE_INDICES.PRODUCTS)
    .where("oid", "==", oid)
    .where("isLive", "==", isLive)
    .orderBy("createdAt", "desc")
    .startAfter(lastId)
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME) // TODO refactor constant
    .get();

  if (response.docs.length === 0) {
    return { products: [] as ZerolensProduct[], lastId: null, hasMore: false };
  }

  return parseDocsToProducts(response.docs);
}

export default getProductsAfterId;
