import { ZerolensProduct } from "@types/models";
import parseDataToProduct from "./parseDataToProduct";

const listOfPropNamesThatAreDifferent = {
  recommendedColors: "productColorRecommondation",
};

const parseProductPartialToDBFormat = (
  product: Partial<ZerolensProduct>
): any => {
  let newProduct = product;
  Object.entries(listOfPropNamesThatAreDifferent).forEach(([key, value]) => {
    newProduct = JSON.parse(JSON.stringify(product).replace(key, value));
  });

  return newProduct;
};

export default parseProductPartialToDBFormat;
