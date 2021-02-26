import { db } from "@services/firebase";
import { Subscription } from "@components/Billing/types";

function subscribeToSubscription(
  organizationId: string,
  callback: (subscription: Subscription) => void
) {
  db.collection("Organizations")
    .doc(organizationId)
    .collection("subscriptions")
    .where("status", "in", ["trialing", "active"])
    .onSnapshot(async (snapshot) => {
      // In this implementation we only expect one active or trialing subscription to exist.
      if (snapshot.size > 0) {
        const doc = snapshot.docs[0].data() as Subscription;
        callback(doc);
      }
    });
}

export default subscribeToSubscription;
