import { Snapshot } from "@types/models";
import { Asset, AssetsDatabaseReference } from "@models/assets/type";
import parseSnapshotToPhoto from "./parseSnapshotToPhoto";

const parseDocsToAssets = (docs): AssetsDatabaseReference => {
  const assets = [] as Asset[];
  docs.forEach((doc) => {
    const asset: Asset = doc.data();
    asset.id = doc.id;

    assets.push(asset);
  });

  return {
    assets,
    lastId: docs[docs.length - 1],
    hasMore: true,
    isLoading: false,
  };
};

export default parseDocsToAssets;
