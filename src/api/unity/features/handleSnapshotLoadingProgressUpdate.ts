export default function handleSnapshotLoadingProgressUpdate(
  argument: [string, number],
  callback
): void {
  const argumentArray = argument;
  const snapshotFirebaseId = argumentArray[0];
  const progress = argumentArray[1];

  callback({
    data: undefined,
    // isLoading: true, // hack since progress is a float and async
    loadingProgress: progress,
    type: "snapshot",
    sidTid: snapshotFirebaseId,
  });
}
