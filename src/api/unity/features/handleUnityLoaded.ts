/* eslint-disable import/prefer-default-export */
import { getSnapshotBySid } from "@api/firebase";
import { unityService } from "@services/unity";
import UNITY_MESSAGING_CONSTANTS from "@services/configs/unityConfig";

export const handleUnityLoaded = async (): Promise<void> => {
  const snapshot = await getSnapshotBySid("jFBjwU5ALEBtxKb2MNcj");

  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.recreateScene,
    JSON.stringify(snapshot)
  );
};
