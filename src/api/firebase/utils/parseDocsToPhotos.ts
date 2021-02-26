import { parse } from "path";
import { GetPhotosReturn } from "@models/photos/types";
import { Photo, Snapshot } from "@types/models";
import parseSnapshotToPhoto from "./parseSnapshotToPhoto";

const parseDocsToPhotos = (docs): GetPhotosReturn => {
  const photos = [] as Photo[];
  docs.forEach((doc) => {
    const snapshot: Snapshot = doc.data();
    const { id } = doc;

    const photo = parseSnapshotToPhoto(snapshot, id);

    photos.push(photo);
  });

  return { photos, id: docs[docs.length - 1], hasMore: true };
};

export default parseDocsToPhotos;
