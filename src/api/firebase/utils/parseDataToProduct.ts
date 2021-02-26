import {
  ZerolensObjectStatus,
  ZerolensObjectTypes,
  ZerolensProduct,
} from "@types/models";

const parseDataToProduct = (
  doc: firebase.firestore.DocumentData
): ZerolensProduct => {
  const product: ZerolensProduct = {
    id: doc.id,
    oid: doc.data().oid,
    type: doc.data().type || ZerolensObjectTypes.Product,
    createdAt: doc.data().createdAt,
    preview: doc.data().preview,
    status: doc.data().status || ZerolensObjectStatus.Live,
    filetype: doc.data().filetype,
    name: doc.data().name || "no name",
    // TODO: why is this called downloadUrl and not assetbundle?
    downloadUrl: doc.data().assetbundle,
    transformation: doc.data().transformation || {},
    modifiers: doc.data().modifiers || ([] as JSON[]),
    recommendedColors:
      doc.data().productColorRecommondation || ([] as string[]),
  };

  return product;
};

export default parseDataToProduct;
