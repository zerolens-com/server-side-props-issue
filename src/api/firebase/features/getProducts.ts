import { db, FIREBASE_INDICES } from "@services/firebase";
import { ZerolensProduct } from "@types/models";
import { ProductsDatabaseReference } from "@models/products/types";
import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import parseDocsToProducts from "../utils/parseDocsToProducts";

async function getProducts(
  oid: string,
  isLive: boolean
): Promise<ProductsDatabaseReference> {
  const response = await db
    .collection(FIREBASE_INDICES.PRODUCTS)
    .where("oid", "==", oid)
    .where("isLive", "==", isLive)
    .orderBy("createdAt", "desc")
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME) // TODO refactor constant
    // .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME) // TODO refactor constant
    .get();

  if (response.docs.length === 0) {
    return { products: [] as ZerolensProduct[], lastId: null, hasMore: false };
  }

  // eslint-disable-next-line no-use-before-define
  return parseDocsToProducts(response.docs);
}

export default getProducts;
