import { db, FIREBASE_INDICES } from "@services/firebase";
import { Material } from "@types/models";

async function getMaterialById(id: string) {
  try {
    const response = await db
      .collection(FIREBASE_INDICES.MATERIALS)
      .doc(id)
      .get();
    return response.data() as Material;
  } catch (error) {
    console.log(error);
  }
}

export default getMaterialById;
