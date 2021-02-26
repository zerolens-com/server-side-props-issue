import { db } from "@services/firebase";
import { Invitation } from "@types/models";

async function getInvitation(id: string): Promise<Invitation> {
  const invitationRef = db.collection("Invitations").doc(id);
  const invitationSnapshot = await invitationRef.get();
  if (!invitationSnapshot.exists) {
    throw ReferenceError("Invitation doesn't exist");
  }
  const invitation = invitationSnapshot.data();
  return invitation as Invitation;
}

async function getPendingInvitations(
  organizationId: string
): Promise<Invitation[]> {
  const response = await db
    .collection("Invitations")
    .where("organization.oid", "==", organizationId)
    .where("status", "==", "pending")
    .get();

  let list: Invitation[];
  list = response.docs.map((doc) => doc.data() as Invitation);
  return list;
}

export { getInvitation, getPendingInvitations };
