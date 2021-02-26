import { Snapshot, Photo } from "@types/models";
import { DEFAULT_PHOTO_PREVIEW } from "@constants";

const parseSnapshotToPhoto = (snapshot: Snapshot, id: string): Photo => {
  const photo: Photo = {
    id,
    createdAt: snapshot.createdAt,
    // current version is v1.02 but the version property only exists since v1.02 therefore we need to check that
    version: snapshot.version ?? "v1.01",
    preview: snapshot.preview,
    previewUrl:
      snapshot.renderinfo?.image_url ||
      snapshot.previewUrl ||
      DEFAULT_PHOTO_PREVIEW,
    status: snapshot.status,
    name: snapshot.metadata?.name || "unnamed",
    isDraft: snapshot.isDraft,
    image: snapshot.image,
    renders: snapshot.renders ?? [],
    ratio: Math.abs(
      snapshot.image.resolutionHeight / snapshot.image.resolutionWidth
    ),
  };

  return photo;
};

export default parseSnapshotToPhoto;
