import { db, FIREBASE_INDICES } from "@services/firebase";
import { Template } from "@types/models";

async function getTemplateById(id: string): Promise<Template> {
  const response = await db
    .collection(FIREBASE_INDICES.TEMPLATES)
    .doc(id)
    .get();
  return response.data() as Template;
}

export default getTemplateById;
