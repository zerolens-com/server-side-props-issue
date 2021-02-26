import { db } from "@services/firebase";
import { Organization } from "@types/models";

function subscribeToOrganization(
  organizationId: string,
  callback: (subscription: Organization) => void
) {
  db.collection("Organizations")
    .doc(organizationId)
    .onSnapshot(async (snapshot) => {
      // In this implementation we only expect one active or trialing subscription to exist.
      if (snapshot.exists) {
        const doc = snapshot.data() as Organization;
        callback(doc);
      }
    });
}

export default subscribeToOrganization;
