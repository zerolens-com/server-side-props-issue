import { db } from "@services/firebase";

// TODO: not really needed
async function getPricingPlans() {
  let productsRef = db.collection("StripeProducts");
  let allProducts = await productsRef.get();
  const allProductsData = allProducts.docs.map((product) => product);
  return allProductsData;
}

export default getPricingPlans;
