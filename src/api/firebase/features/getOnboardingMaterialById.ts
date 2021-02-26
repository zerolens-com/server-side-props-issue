import { db } from "@services/firebase";
import { OnboardingMaterial } from "@types/models";

async function getOnboardingMaterialById(id: string) {
  try {
    const response = await db.collection("OnboardingMaterials").doc(id).get();
    return response.data() as OnboardingMaterial;
  } catch (error) {
    console.log(error);
  }
}

export default getOnboardingMaterialById;
