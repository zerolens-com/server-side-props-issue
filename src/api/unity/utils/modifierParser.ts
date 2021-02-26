import { UNIQUE_IDENTIFIERS_IN_MODIFIER_OPTIONS } from "@constants";
import { ObjectModifierComponents } from "@types/models";

export const unityModifierToJSNormalized = (
  modifiers: Array<any>
): Record<string, any> => {
  const jsModifiers = {};

  modifiers?.forEach((modifier) => {
    let jsKey = "";
    const jsModifierOptions = {};
    const jsModifier = { ...modifier };

    modifier.options.forEach((option) => {
      const [key, value] = option.split("=");

      if (UNIQUE_IDENTIFIERS_IN_MODIFIER_OPTIONS.includes(key)) {
        if (value !== "false") {
          jsKey = value;
        }
      }
      try {
        jsModifierOptions[key] = JSON.parse(value);
      } catch {
        jsModifierOptions[key] = value;
      }
    });

    jsModifier.options = jsModifierOptions;

    jsModifiers[jsKey] = jsModifier;
  });

  return jsModifiers;
};

export const normalizedJsModifierToUnity = (normalizedModifiers) => {
  const unityModifiers = [];
  try {
    Object.keys(normalizedModifiers).forEach((id) => {
      const jsModifier = { ...normalizedModifiers[id] };
      const unityModifierOptions = [];
      Object.keys(jsModifier.options).forEach((optionKey) => {
        unityModifierOptions.push(
          `${optionKey}=${jsModifier.options[optionKey]}`
        );
      });
      jsModifier.options = unityModifierOptions;
      unityModifiers.push(jsModifier);
    });
  } catch (error) {
    console.log(error);
  }

  delete unityModifiers.modifierComponents;

  return JSON.stringify(unityModifiers);
};

export const getModifierComponentsFromModifiers = (
  normalizedModifiers
): Record<string, string[]> => {
  const components = {};
  Object.keys(normalizedModifiers).forEach((id) => {
    const modifier = normalizedModifiers[id];
    let modifierComponents = [];
    switch (modifier.type) {
      case "materialEdit":
        if (
          modifier.options.isColorChangeable
          // TODO: this will be implemented in the future, we will activate this then and asume that if the property doesn't exist than it'S true
          //   && !(modifier.options.canUserChange === false)
        ) {
          modifierComponents.push(ObjectModifierComponents.COLOR_PICKER);
        }
        if (
          modifier.options.isMaterialChangeable &&
          // if no canUserChangeMaterial property available default to true -> legacy
          (modifier.options.canUserChangeMaterial ?? true)
        ) {
          modifierComponents.push(ObjectModifierComponents.MATERIAL_PICKER);
        }
        break;

      default:
        modifierComponents = [ObjectModifierComponents.NONE];
        break;
    }
    if (modifierComponents.length === 0) {
      modifierComponents.push(ObjectModifierComponents.NONE);
    }
    components[id] = modifierComponents;
  });
  return components;
};

const testModifier = [
  // MATERIAL EDIT WITH MATERIAL AND COLOR CHANGE.
  {
    type: "materialEdit",
    modifierViewerText: "Object Color", // human readble name in viewer. ignored by max/unity
    maxOptions: {
      mapName: "object_color_map", // max color map name. ignored by unity
      materialName: "object_color_map", // must be equal to map name! Dont ask why, NOT Material name! ignored by unity
    },
    colorRec: [
      // recommended colors. ignored by unity
      "#6780AB",
    ],
    options: [
      "materialName=0_material_Box001_", // unity material name. Ignored by max.
      "isColorChangeable=true", // true if UNITY should change color. Option not set = assume false.
      "canUserChangeMaterial=true", // true if USER should be able to change color/material
      "isMaterialChangeable=true", // true if a completely different material can be applied. Option not set = assume true.
      "defaultColor=#6780AB", // current color or color to be set
      "changeableMaterialID=materials/japanese_house_wooden_floor", // material id that has been applied to. Only set when isMaterialChangeable is set to true.
      "materialFirebaseId=ZteSCT44TTfm58j8soPU", // material firebase ID. Is kept upadted by unity but not interpreted.
    ],
    externalFiles: {
      diffuse: {
        preview:
          "https://pngimage.net/wp-content/uploads/2018/05/checkers-png.png",
        render:
          "https://pngimage.net/wp-content/uploads/2018/05/checkers-png.png",
      },
      normal: {
        preview: "",
        render: "",
      },
      metalness: {
        preview: "",
        render: "",
      },
      smoothness: {
        preview: "",
        render: "",
      },
    },
  },
  // LIGHT COLOR CHANGE. Max does not need to distinguish between material change and light change as the light color is controlled via a color map.
  {
    type: "materialEdit",
    modifierViewerText: "Light Bulb Color", // human readble name in viewer. ignored by max/unity
    options: [
      "isLight=true", // true if light. Ignored by max. Option not set => assume false.
      "unityLightGameObjectName=light_001", // GameObject name in unity with light component. ignored by max.
      "isColorChangeable=true", // Option not set => assume false.
      "defaultColor=#88ffff", // current light color / color to be set.
    ],
  },
];
