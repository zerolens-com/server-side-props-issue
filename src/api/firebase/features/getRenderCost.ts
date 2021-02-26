import { db, FIREBASE_INDICES } from "@services/firebase";
import { RenderSize } from "@types/models";

async function getRenderCost() {
  const response = await db.collection(FIREBASE_INDICES.CMS).doc("sizes").get();
  return response.data() as RenderSize[];
}

export default getRenderCost;
