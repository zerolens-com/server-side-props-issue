import { getPublicConfig } from "@constants";
import { db, FIREBASE_INDICES } from "@services/firebase";
import { UnityPaths } from "@types/models";

async function getUnityPaths() {
  const response = await db
    .collection(FIREBASE_INDICES.DEPLYOMENT)
    .doc(getPublicConfig().unity.FIREBASE_PATH)
    .get();

  return response.data() as UnityPaths;
}

export default getUnityPaths;
