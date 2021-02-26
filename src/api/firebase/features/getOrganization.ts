import { db, FIREBASE_INDICES } from "@services/firebase";
import { Organization } from "@types/models";

async function getOrganization(oid: string): Promise<Organization> {
  const response = await db
    .collection(FIREBASE_INDICES.ORGANIZATION)
    .doc(oid)
    .get();

  // no oid is stored in the organization, should be stored in there (firestore)
  const data = response.data() as Organization;
  data.oid = oid;
  return data;
}

export default getOrganization;
