import { ZerolensProduct } from "@types/models";
import { ProductsDatabaseReference } from "@models/products/types";
import parseDataToProduct from "./parseDataToProduct";

const parseDocsToProducts = (
  docs: firebase.firestore.DocumentSnapshot[]
): ProductsDatabaseReference => {
  const products = [] as ZerolensProduct[];
  docs.forEach((doc) => {
    const product = parseDataToProduct(doc);
    products.push(product);
  });

  return { products, lastId: docs[docs.length - 1], hasMore: true };
};

export default parseDocsToProducts;
