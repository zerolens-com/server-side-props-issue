/* eslint-disable import/prefer-default-export */
export const handleSnapshotLoaded = (actions): void => {
  setTimeout(() => {
    actions.currentSnapshotLoadingCompleted();
  }, 200);
};
