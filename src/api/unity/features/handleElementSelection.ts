import { ViewerElement } from "@models/viewer/type";

/* eslint-disable import/prefer-default-export */
export const handleElementSelection = (
  { firebaseId, type, modifiers, tool, modifierComponents, product },
  actions
): void => {
  const viewerElement = new ViewerElement(type, {
    modifiers,
    id: firebaseId,
    modifierComponents,
    tool,
    product,
  });

  actions.setCurrentSelection(viewerElement);
  actions.handleCurrentSelectionEnrichementWithFirebaseData({
    type,
    id: firebaseId,
  });
};
