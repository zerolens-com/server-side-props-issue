import {
  ViewerEnvironment,
  ViewerEnvironmentModifier,
} from "@models/viewer/type";

import { getModifierComponentsFromModifiers } from "../utils/modifierParser";

/* eslint-disable import/prefer-default-export */
export const handleEnvironmentSelection = (
  modifiers: Record<string, ViewerEnvironmentModifier>,
  actions
): void => {
  const modifierComponents = getModifierComponentsFromModifiers(modifiers);
  const viewerEnvironment = new ViewerEnvironment({
    modifiers,
    modifierComponents,
  });

  actions.setCurrentSelection(viewerEnvironment);
  actions.handleCurrentEnvironmentSelectionEnrichementWithFirebaseData();
};
