import { createSnapshot } from "@api/firebase";

import getSnapshotBySid from "./getSnapshotBySid";

async function createHQSnapshot(
  snapshotId: string,
  renderParams: {
    resolutionHeight: number;
    resolutionWidth: number;
    resolution: string;
  }
) {
  try {
    // creating a HQ snapshot is a little different since we already have a low quality snapshot
    // first, we'll get the existing snapshot
    const snapshot = await getSnapshotBySid(snapshotId);

    // and then we change it to a paid high quality snapshot
    snapshot.isDraft = false;

    // change its status back to created, since this snapshot was already complete
    snapshot.status = "created";

    // then we set the new resolution type (e.g social_portrait)
    snapshot.image.resolution = renderParams.resolution;

    // and then we set the actual height and width we want to render at
    snapshot.image.resolutionHeight = renderParams.resolutionHeight;
    snapshot.image.resolutionWidth = renderParams.resolutionWidth;

    // after changing the data, we just use the normal create snapshot function
    await createSnapshot(snapshot);
  } catch (error) {
    console.log(error);
  }
}

export default createHQSnapshot;
