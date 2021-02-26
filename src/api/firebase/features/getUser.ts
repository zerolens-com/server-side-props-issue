import { db, FIREBASE_INDICES } from "@services/firebase";
import { DBUser } from "@types/models";

async function getUser(uid: string): Promise<DBUser> {
  const response = await db.collection(FIREBASE_INDICES.USER).doc(uid).get();
  const data = response.data() as DBUser;
  return data;
}

export default getUser;
