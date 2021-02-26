import debounce from "lodash/debounce";
import { toast } from "react-hot-toast";

import {
  BoundingBox,
  PositionRotationScaleUpdateParams,
} from "@models/editor/types";
import {
  DOF,
  LoadObject,
  ViewerEnvironmentModifier,
  UnityInteractionsModes,
} from "@models/viewer/type";
import UNITY_MESSAGING_CONSTANTS from "@services/configs/unityConfig";
import { unityService } from "@services/unity";
import { Logginglevels, NotifiyReportTypes, Snapshot } from "@types/models";

import { handleElementSelection } from "./unity/features/handleElementSelection";
import { handleEnvironmentSelection } from "./unity/features/handleEnvironmentSelection";
import { handleRequestCurrentSnapshotData } from "./unity/features/handleRequestCurrentSnapshotData";
import { handleSnapshotLoaded } from "./unity/features/handleSnapshotLoaded";
import handleSnapshotLoadingProgressUpdate from "./unity/features/handleSnapshotLoadingProgressUpdate";
import { Tools } from "./unity/types";
import defaultObjectInformation from "./unity/utils/defaultObject";
import {
  unityModifierToJSNormalized,
  getModifierComponentsFromModifiers,
  normalizedJsModifierToUnity,
} from "./unity/utils/modifierParser";

const recreateScene = (snapshot: Partial<Snapshot>): boolean => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.recreateScene,
    JSON.stringify(snapshot)
  );
  return true;
};

const load3dFileFromURL = (
  modelPath: string,
  filetype?: string,
  localPath?: string
): boolean => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.load3dFileFromURL,
    `${modelPath}␞${filetype ?? ""}␞${localPath ?? ""}`
  );
  return true;
};

const getAllMaterialInformation = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.getMaterialInformation
  );

const focusUnity = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.focusCanvas,
    "1"
  );

const deFocusUnity = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.focusCanvas,
    "0"
  );

const turnAutoFocusOn = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setFocusMode,
    "0"
  );

const turnAutoFocusOff = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setFocusMode,
    "1"
  );

const dofEnabled = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setDofEnabled,
    "false"
  );

const dofDisabled = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setDofEnabled,
    "false"
  );

const setDofLevel = (dof: DOF): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setDofLevel,
    dof
  );

const resetCamera = (): boolean =>
  unityService.sendUnityEvent(UNITY_MESSAGING_CONSTANTS.senders.resetView);

const resetScene = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.resetViewAndComposition
  );

const turnGravityOff = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setPhysicsUsable,
    "false"
  );

const turnGravityOn = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setPhysicsUsable,
    "true"
  );

const changeTool = (tool: Tools): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.OnToolChanged,
    tool
  );

const flipObjectVertial = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.flipObjectVertial,
    "horizontal"
  );

const flipObjectHorizontal = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.flipObjectHorizontal,
    "vertical"
  );

const deleteObject = (): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.deleteSelectedObject
  );

const changeModifiersOfSelectedObject = debounce((modifiers): boolean => {
  const currMods = { ...modifiers };
  delete currMods.modifierComponents;

  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.applyModifierToSelectedObject,
    normalizedJsModifierToUnity(currMods)
  );
  return true;
});

const changeModifiersOfSelectedEnvironment = (modifiers): boolean => {
  const currMods = { ...modifiers };
  delete currMods.modifierComponents;

  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.applyModifierToEnvironment,
    normalizedJsModifierToUnity(currMods)
  );
  return true;
};

const setUnityInteractionMode = (
  unityInteractionMode: UnityInteractionsModes
) => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.SetInteractionMode,
    unityInteractionMode
  );
};

const requestMaterialsOnProduct = () => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.requestMaterialsOnProduct
  );
};

const focusCameraToSelectedObjectOrObjectToEdit = () => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.focusCameraToSelectedObjectOrObjectToEdit
  );
};

// prepares paramaters as a RS separated string
const prepareLoadObjectParams = ({
  objId,
  assetBundleIdentifier,
  type,
  modifiers,
  filetype = "assetBundle",
}: Omit<LoadObject, "transformation">): string => {
  const returnValue = `${objId}␞${
    assetBundleIdentifier.split("/AssetBundles/")[1]
  }␞${type}␞${JSON.stringify(modifiers ?? [])}␞${filetype}`;

  return returnValue;
};

const prepareLoadObjectParamsJSON = ({
  objId,
  assetBundleIdentifier,
  type,
  modifiers,
  filetype = "assetBundle",
  transformation,
  userEscaped = false,
}) => {
  const mergedObject = {
    // Here we set the default transformation
    ...defaultObjectInformation,
    type,
    filetype: filetype ?? "assetBundle",
    // renameMaterials: filetype == "assetBundle" ? "false" : "true",
    objectID: objId,
    assetBundleIdentifier: assetBundleIdentifier.includes("/AssetBundles/")
      ? assetBundleIdentifier.split("/AssetBundles/")[1]
      : assetBundleIdentifier,
    modifiers: modifiers ?? [],
    // and here we overwrite the transformation again
    ...transformation,
  };

  // userEscaped defines if the string should be user sanitized or not
  return `${JSON.stringify(mergedObject)}␞${userEscaped.toString()}`;
};

const getAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson = () => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders
      .getAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson
  );
};

const replaceSelectedAndLoadNewProductOrObject = ({
  objId,
  assetBundleIdentifier,
  type,
  modifiers,
  filetype = undefined,
  transformation,
}: LoadObject): boolean =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders
      .replaceSelectedAndLoadNewProductOrObjectWithJSON,
    prepareLoadObjectParamsJSON({
      objId,
      assetBundleIdentifier,
      type,
      modifiers,
      filetype,
      transformation,
      userEscaped: false,
    })
  );

const loadObject = ({
  objId,
  assetBundleIdentifier,
  type,
  modifiers,
  filetype = undefined,
  transformation,
}: LoadObject): boolean => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.loadNewProductOrObjectWithJSON,
    prepareLoadObjectParamsJSON({
      objId,
      assetBundleIdentifier,
      type,
      modifiers,
      filetype,
      transformation,
      userEscaped: true,
    })
  );

  // console.log("JSON Product : ", JSON.stringify(prepareLoadObjectParamsJSON({
  //   objId,
  //   assetBundleIdentifier,
  //   type,
  //   modifiers,
  //   fileType,
  //   transformation
  // })))

  // unityService.sendUnityEvent(
  //   UNITY_MESSAGING_CONSTANTS.senders.loadNewProductOrObject,
  //   prepareLoadObjectParams({
  //     objId,
  //     assetBundleIdentifier,
  //     type,
  //     modifiers,
  //     fileType,
  //   })
  // );
};

const requestUnityScreenshot = debounce((callbackFunctionName: string) => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.sendScreenshotAsBase64EncodedJpg,
    callbackFunctionName
  );
}, 2000);

const removeModifier = (modifierType: string, identifier: string) => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.removeModifierAndRecordActionForUndoStack,
    `${modifierType}␞${identifier}`
  );
};

// const applyMaterialChangeToEnvironment = (modifier) => {
//   const testModifier = [
//     {
//       type: "materialEdit",
//       options: [
//         "materialName=floor",
//         "isColorChangeable=false",
//         "defaultColor=#ffffff",
//         "isMaterialChangeable=true",
//         "changeableMaterialID=materials/paper/cardboard",
//         "materialFirebaseId=igrcVfbGEhDfvTz3q9wD",
//         "isLight=false",
//         "unityLightGameObjectName=false",
//       ],
//       externalFiles: {
//         diffuse: { preview: "", render: "" },
//         normal: { preview: "", render: "" },
//         specular: { preview: "", render: "" },
//         roughness: { preview: "", render: "" },
//         metalness: { preview: "", render: "" },
//         height: { preview: "", render: "" },
//         emission: { preview: "", render: "" },
//       },
//     },
//   ];

//   const test = normalizedJsModifierToUnity(testModifier);

//   unityService.sendUnityEvent(
//     UNITY_MESSAGING_CONSTANTS.senders.applyModifierToEnvironment,
//     test
//   );
// };

const applyMaterialChangeToEnvironment = (modifiers): boolean => {
  // const currMods = { ...modifiers };
  // delete currMods.modifierComponents;

  for (const [key, modifier] of Object.entries(modifiers)) {
    const defaultColor =
      modifier.externalFiles?.diffuse?.value ||
      modifier.options?.defaultColor ||
      "#ffffff";
    modifier.externalFiles.diffuse.value = defaultColor;
  }

  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.applyModifierToEnvironment,
    normalizedJsModifierToUnity(modifiers)
  );
  return true;
};

const highlightMaterial = (materialName: string) =>
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.highlightMaterialInEditMode,
    materialName
  );

const undo = () => {
  unityService.sendUnityEvent(UNITY_MESSAGING_CONSTANTS.senders.undo);
  requestCurrentSnapshotData();
};

const redo = () => {
  unityService.sendUnityEvent(UNITY_MESSAGING_CONSTANTS.senders.redo);
  requestCurrentSnapshotData();
};

const requestCurrentSnapshotData = () => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.requestCurrentSnapshotData,
    "requestCurrent"
  );
};

const requestCurrentSnapshotDataPhoto = () => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.requestCurrentSnapshotData,
    "requestCurrentPhoto"
  );
};

const setPositionRotationScaleForSelectedObject = (
  options: PositionRotationScaleUpdateParams
) =>
  // tX,tY,tZ,rX,rY,rZ,sX,sY,sZ
  {
    const commandString = `${options.tX},${options.tY},${options.tZ},${options.rX},${options.rY},${options.rZ},${options.sX},${options.sY},${options.sZ}`;
    unityService.sendUnityEvent(
      UNITY_MESSAGING_CONSTANTS.senders
        .setPositionRotationScaleForSelectedObject,
      commandString
    );
  };

const setRotationAllowed = (allowed: boolean) => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setRotationAllowed,
    allowed.toString()
  );
};

const setMovementAllowed = (allowed: boolean) => {
  unityService.sendUnityEvent(
    UNITY_MESSAGING_CONSTANTS.senders.setMovementAllowed,
    allowed.toString()
  );
};

const initViewer = (actions, getStoreState, getStoreActions): void => {
  const storeActions = getStoreActions();

  const debouncedAddHistoryToWork = debounce((data) =>
    storeActions.works.newHistoryToDB({ payload: data, isUserSave: false })
  );
  const COMPONENT_NAME = "INIT";
  // unityService.listenUnityEvent(
  //   UNITY_MESSAGING_CONSTANTS.listeners.GameControlReady,
  //   COMPONENT_NAME,
  //   handleUnityLoaded
  // );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.snapshotLoadingProgressUpdate,
    COMPONENT_NAME,
    (argument) => {
      handleSnapshotLoadingProgressUpdate(
        argument,
        actions.updateCurrentSnapshot
      );
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.requestCurrentSnapshotData,
    COMPONENT_NAME,
    (snapshot) => {
      handleRequestCurrentSnapshotData(actions, snapshot);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.requestCurrentSnapshotDataPhoto,
    COMPONENT_NAME,
    (snapshot) => {
      actions.handlePhotoSnapshotDataFromUnity(snapshot);
    }
  );

  // snapshot loaded, now request current snapshot data and get recommended colors
  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.stopSnapshotLoadingSpinner,
    COMPONENT_NAME,
    () => {
      handleSnapshotLoaded(storeActions.viewer);
      requestCurrentSnapshotData();
    }
  );

  //   unityService.listenUnityEvent(
  //     UNITY_MESSAGING_CONSTANTS.listeners.sendSnapshotDataToExternalHandler,
  //     COMPONENT_NAME,
  //     this.handleSnapshotToAPI
  //   );
  //   unityService.listenUnityEvent(
  //     UNITY_MESSAGING_CONSTANTS.listeners.sendModifiersOnEnvironment,
  //     COMPONENT_NAME,
  //     this.handleEnvironmentModifier
  //   );
  //   unityService.listenUnityEvent(
  //     UNITY_MESSAGING_CONSTANTS.listeners.sendTrackingEvent,
  //     COMPONENT_NAME,
  //     this.handleSendTrackingEvent
  //   );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.productSelected,
    COMPONENT_NAME,
    (argument) => {
      const productData = argument[0];
      const modifiers = unityModifierToJSNormalized(productData.modifiers);

      delete productData.modifiers;

      // TODO: rename to handleProductOrObject or something -> currently misleading
      handleElementSelection(
        {
          firebaseId: productData.objectID,
          type: productData.type,
          modifiers,
          modifierComponents: getModifierComponentsFromModifiers(modifiers),
          tool: argument[1],
          product: productData,
        },
        actions
      );
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.deselectProducts,
    COMPONENT_NAME,
    () => {
      actions.deleteCurrentSelection();
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.onUserHasInteractionToolChanged,
    COMPONENT_NAME,
    (tool: Tools) => {
      actions.setActiveTool(tool);
    }
  );

  // unityService.listenUnityEvent(
  //   UNITY_MESSAGING_CONSTANTS.listeners.objectLoadingProgressUpdate,
  //   COMPONENT_NAME,
  //   (firebaseId, type, progress) =>
  //     myCustomCallback(firebaseId, type, progress, actions)
  // );
  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.objectLoadingProgressUpdate,
    COMPONENT_NAME,
    ([firebaseId, type, progress]) =>
      actions.pushAssetLoading({
        id: firebaseId,
        type,
        progress,
      })
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.productLoadingProgressUpdate,
    COMPONENT_NAME,
    ([firebaseId, type, progress]) => {
      // alert(`Progress update ${progress}`);
      actions.pushAssetLoading({
        id: firebaseId,
        type,
        progress,
      });
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.stopObjectLoadingSpinner,
    COMPONENT_NAME,
    ([firebaseId]) => actions.removeAssetLoading(firebaseId)
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.materialLoadingProgressUpdate,
    COMPONENT_NAME,
    ([firebaseId, type, progress]) => {
      actions.pushAssetLoading({
        id: firebaseId,
        type,
        progress,
      });
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.stopMaterialLoadingSpinner,
    COMPONENT_NAME,
    ([firebaseId]) => actions.removeAssetLoading(firebaseId)
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.stopProductLoadingSpinner,
    COMPONENT_NAME,
    ([firebaseId]) => {
      // remove asset from loading array
      actions.removeAssetLoading(firebaseId);
      // update recommended colors
      actions.getRecommendedColors();
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendModifiersOnEnvironment,
    COMPONENT_NAME,
    (argument: [string, string]) => {
      const parsedArg = argument[1];

      const normalizedArgs = unityModifierToJSNormalized(parsedArg) as Record<
        string,
        ViewerEnvironmentModifier
      >;

      handleEnvironmentSelection(normalizedArgs, actions);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.requestMaterialsOnProduct,
    COMPONENT_NAME,
    (materials: string[]) => {
      console.log("_____HERE______ ", materials);
      storeActions.editor.handleRecieveMaterialsOnProduct(materials);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendAllMaterials,
    COMPONENT_NAME,
    (data) => {
      const lines = data[0].split("\n");
      const materials = [];
      lines.forEach((line) => {
        if (line.split("GameObject")[1]) {
          const materialName = line.split(" ")[1];
          materials.push(materialName);
        }
      });
      storeActions.editor.handleAndParseRecievedMaterialsOnProduct(materials);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendScreenshotAsBase64EncodedJpg,
    COMPONENT_NAME,
    (data) => {
      storeActions.viewer.handleScreenshotAsBase64EncodedJpg(data);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendEdtiorScreenshotAsBase64EncodedJpg,
    COMPONENT_NAME,
    (data) => {
      storeActions.editor.handleEditorScreenshotAsBase64EncodedJpg(data);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendWorkPreviewAsBase64EncodedJpg,
    COMPONENT_NAME,
    (data) => {
      storeActions.works.addPreviewToHistoryById(data);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.saveSnapshotData,
    COMPONENT_NAME,
    (data) => {
      debouncedAddHistoryToWork(data);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners
      .sendAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson,
    COMPONENT_NAME,
    (
      data: { x: string; y: string; z: string } = { x: "1", y: "1", z: "1" }
    ) => {
      const parsedBoundingBox: BoundingBox = {
        x: Number(data.x),
        y: Number(data.y),
        z: Number(data.z),
      };

      storeActions.editor.setBoundingBox(parsedBoundingBox);
    }
  );

  unityService.listenUnityEvent(
    UNITY_MESSAGING_CONSTANTS.listeners.sendReportObject,
    COMPONENT_NAME,
    (data: {
      Date: string;
      LoggingLevel: number;
      Message: string;
      Notify: number[];
    }) => {
      const level: Logginglevels =
        Logginglevels[Logginglevels[data.LoggingLevel]];

      console.log("sendreport: ", data);

      const callToast = () => {
        switch (level) {
          case Logginglevels.ERROR:
            toast.error(data.Message, { duration: 20000 });
            break;

          case Logginglevels.WARNING:
            toast(data.Message, {
              icon: "⚠️",
              duration: 4000,
            });
            break;

          case Logginglevels.INFO:
            toast(data.Message, {
              icon: "ℹ️",
              duration: 2000,
            });
            break;
          default:
            break;
        }
      };

      const notificationRecievers = data.Notify;

      notificationRecievers.forEach((notifyIndex) => {
        switch (NotifiyReportTypes[NotifiyReportTypes[notifyIndex]]) {
          case NotifiyReportTypes.CONSOLE:
            console.log("UNITY NOTIFICATIONS: ", data.Message);
          case NotifiyReportTypes.SUPPORT:
            // TODO: send email to support // call function
            break;
          case NotifiyReportTypes.USER:
            callToast();
            break;
          case NotifiyReportTypes.ALL:
            callToast();
            console.log("UNITY NOTIFICATIONS: ", data.Message);
            break;
          default:
            break;
        }
      });

      // {"Date":"2020-12-04T09:54:39.2230221+01:00","LoggingLevel":1,"Message":"Some test error message","Notify":[2,1]} endOfExample) (Logginglevels: 0 = None, 1 = Error, 2 = Warning, 3 = Info, 4 = Verbose) (Notify: 0 = None, 1 = User, 2 = Support, 3 = All, 4 = Log Json in Editor)
      // const parsedBoundingBox: BoundingBox = {
      //   x: Number(data.x),
      //   y: Number(data.y),
      //   z: Number(data.z),
      // };

      // storeActions.editor.setBoundingBox(parsedBoundingBox);
    }
  );

  //   unityService.listenUnityEvent(
  //     UNITY_MESSAGING_CONSTANTS.listeners.undoUnityExternalEvent,
  //     COMPONENT_NAME,
  //     this.handleUndo
  //   );
};

export {
  resetCamera,
  focusUnity,
  deFocusUnity,
  turnAutoFocusOn,
  turnAutoFocusOff,
  setDofLevel,
  resetScene,
  turnGravityOff,
  turnGravityOn,
  dofDisabled,
  dofEnabled,
  initViewer,
  loadObject,
  changeTool,
  flipObjectVertial,
  flipObjectHorizontal,
  deleteObject,
  changeModifiersOfSelectedObject,
  replaceSelectedAndLoadNewProductOrObject,
  applyMaterialChangeToEnvironment,
  undo,
  redo,
  requestCurrentSnapshotData,
  requestCurrentSnapshotDataPhoto,
  recreateScene,
  changeModifiersOfSelectedEnvironment,
  setUnityInteractionMode,
  load3dFileFromURL,
  requestMaterialsOnProduct,
  getAllMaterialInformation,
  highlightMaterial,
  requestUnityScreenshot,
  setPositionRotationScaleForSelectedObject,
  removeModifier,
  getAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson,
  setMovementAllowed,
  setRotationAllowed,
  focusCameraToSelectedObjectOrObjectToEdit,
};
