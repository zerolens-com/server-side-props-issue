import { db, FIREBASE_INDICES } from "@services/firebase";
import { CMSData } from "@types/models";

async function getMainCMSData() {
  const response = await db.collection(FIREBASE_INDICES.CMS).doc("Main").get();
  return response.data() as CMSData;
}

export default getMainCMSData;
