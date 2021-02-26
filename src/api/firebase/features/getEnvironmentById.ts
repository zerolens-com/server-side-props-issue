import { db } from "@services/firebase";
import { Environment } from "@types/models";

async function getEnvironmentById(id: string): Promise<Environment> {
  try {
    const response = await db.collection("Environments").doc(id).get();
    const environment = response.data() as Environment;
    return environment;
  } catch (error) {
    console.log(error);
  }
}

export default getEnvironmentById;
