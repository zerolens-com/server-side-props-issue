import { db, FIREBASE_INDICES } from "@services/firebase";
import { ZerolensObject } from "@types/models";

async function getObjectById(id: string): Promise<ZerolensObject> {
  const response = await db.collection(FIREBASE_INDICES.OBJECTS).doc(id).get();
  const currObject = response.data();
  currObject.recommendedColors = currObject.reccomendedColors;
  currObject.id = id;
  // TODO: why do we delete recommended colors here?
  delete currObject.reccomendedColors;
  return currObject as ZerolensObject;
}

export default getObjectById;
