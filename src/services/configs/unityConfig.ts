// UnityService will automatically initialize all of the listeners during it's initialization phase
// listeners' property names are corresponding to the Unity <-> React API
// the unityListenerName and the listeners' names might vary in the future if they are updated.

export default {
  listeners: {
    stopEnvironmentLoadingSpinner: {
      returnType: "csv",
      unityLisenerName: "stopEnvironmentLoadingSpinner",
    }, // called once an environment finished loading, regardless of the success or failure. Parameter are a string of env firebase ID and success ("success"/"fail"), separated with the Record Seperator Symbol (see Modifier structure)
    stopProductLoadingSpinner: {
      returnType: "csv",
      unityLisenerName: "stopProductLoadingSpinner",
    }, // called once a product finished loading, regardless of the success or failure. Parameter are a string of firebase ID, type and success ("success"/"fail"), separated with the Record Seperator Symbol (see Modifier structure)
    stopObjectLoadingSpinner: {
      returnType: "csv",
      unityLisenerName: "stopObjectLoadingSpinner",
    }, // called once a product finished loading, regardless of the success or failure. Parameter are a string of firebase ID, type and success ("success"/"fail"), separated with the Record Seperator Symbol (see Modifier structure)
    stopSnapshotLoadingSpinner: {
      returnType: "csv",
      unityLisenerName: "stopSnapshotLoadingSpinner",
    }, // called once a snapshot is fully loaded. Parameter are a string of the snapshot's firebase ID and success ("success"/"fail"), separated with the Record Seperator Symbol (see Modifier structure)
    stopMaterialLoadingSpinner: {
      returnType: "csv",
      unityLisenerName: "stopMaterialLoadingSpinner",
    }, // called once a material is fully loaded, regardless of the success or failure. Parameter are a string of the material's firebase ID and success ("success"/"fail"), separated with the Record Seperator Symbol (see Modifier structure)
    GameControlReady: {
      returnType: undefined,
      unityLisenerName: "GameControlReady",
    }, // called once Unity has successfully been loaded and is ready to receive commands.
    sendGameControlReady: {
      returnType: undefined,
      unityLisenerName: "sendGameControlReady",
    }, // called once Unity has successfully been loaded and is ready to receive commands.
    snapshotLoadingProgressUpdate: {
      returnType: "csv",
      unityLisenerName: "snapshotLoadingProgressUpdate",
    }, // sent every frame while downloading a snapshot. String consists of the snapshots firebase id and the progress, separated with the Record Seperator Symbol (see Modifier structure)
    environmentLoadingProgressUpdate: {
      returnType: "csv",
      unityLisenerName: "environmentLoadingProgressUpdate",
    }, // sent every frame while downloading an environment. String consists of the evns firebase id and the progress, separated with the Record Seperator Symbol (see Modifier structure)
    objectLoadingProgressUpdate: {
      returnType: "csv",
      unityLisenerName: "objectLoadingProgressUpdate",
    }, // sent every frame while downloading a product or object (except when it is loaded as part of a snapshot)). String consists of the object's/product's firebase id, type, and the progress, separated with the Record Seperator Symbol (see Modifier structure)
    productLoadingProgressUpdate: {
      returnType: "csv",
      unityLisenerName: "productLoadingProgressUpdate",
    }, // sent every frame while downloading a product or object (except when it is loaded as part of a snapshot)). String consists of the object's/product's firebase id, type, and the progress, separated with the Record Seperator Symbol (see Modifier structure)
    materialLoadingProgressUpdate: {
      returnType: "csv",
      unityLisenerName: "materialLoadingProgressUpdate",
    }, // sent every frame while downloading a material (except when it is loaded as part of a snapshot)). String consists of the materials's firebase id, type, and the progress, separated with the Record Seperator Symbol (see Modifier structure)
    onSnapshotRecreateFinished: {
      returnType: "value",
      unityLisenerName: "onSnapshotRecreateFinished",
    }, // sent when the scene recreation is completed.
    sendShowInfo: { returnType: "csv", unityLisenerName: "sendShowInfo" }, // infoText, string status, float durationInMs, //sends arbitray information to be displayed by react.
    deselectProducts: {
      returnType: undefined,
      unityLisenerName: "DeselectProducts",
    }, // called when the current selection is canceled.
    productSelected: { returnType: "csv", unityLisenerName: "ProductSelected" }, // Called when product is selected. firebaseID is the id of the object or product in firebase. Type is "product" or "obj". ModifierJSON is a JSON containing all modifiers on the object. CurrentTool is the tool that is used to manipulate the object, e.g. "Rotate" or "Move". Params separated with the Record Seperator Symbol (see Modifier structure)
    onUserHasInteractionToolChanged: {
      returnType: "value",
      unityLisenerName: "onUserHasInteractionToolChanged",
    }, // called when user changed the interaction tool via button. Possible parameter values: "None", "Move", "Rotate", "Scale", "View".
    undoUnityExternalEvent: {
      returnType: ",",
      unityLisenerName: "undoUnityExternalEvent",
    }, // called if the user undoes an event that has been pushed earlier via UndoManager → pushExternalEvent(eventstring). It returns comma seperated values, the first is the type, the next the parameters. By default, it will call gravity and modifier changes: "gravity,off",
    sendTrackingEvent: {
      returnType: "json",
      unityLisenerName: "sendTrackingEvent",
    }, // called if the user did a trackable action. Tracking event is a json.
    modifierChangedByUnity: {
      returnType: "csv",
      unityLisenerName: "modifierChangedByUnity",
    }, // same as productSelected, but only fired by undo, can be handled differently (e.g. w/o tracking).
    notifyTutorialStepAchievedObjectNearGhost: {
      returnType: undefined,
      unityLisenerName: "notifyTutorialStepAchievedObjectNearGhost",
    }, // called if tutorial step has been achieved: An object has been brought to its supposed position / rotation

    // Return calls triggered by function:
    sendSnapshotDataToExternalHandler: {
      returnType: "json",
      unityLisenerName: "sendSnapshotDataToExternalHandler",
    }, // Called by Network→connectToDBAndSendData
    selectedObjectsTransformationData: {
      returnType: "csv",
      unityLisenerName: "selectedObjectsTransformationData",
    }, // Called by SceneRecreator→sendSelectedObjectTransformationDataViaExternalFunction
    sendAllMaterials: {
      returnType: "csv",
      unityLisenerName: "sendAllMaterials",
    }, // Called by ModifierManager→getMaterialInformation
    sendModifiersOnEnvironment: {
      returnType: "csv",
      unityLisenerName: "sendModifiersOnEnvironment",
    }, // Called by requestAllModifiersOnEnvironment(). Also see Modifier structure
    funcNameSnapshotData: {
      returnType: "json",
      unityLisenerName: "funcNameSnapshotData",
    }, // Called by requestCurrentSnapsthotData(funcName). Returns JSON such as in a snapshot.
    sendCurrentTool: {
      returnType: "value",
      unityLisenerName: "sendCurrentTool",
    }, // Called by CameraController→sendTool()
    requestCurrentSnapshotData: {
      returnType: "json",
      unityLisenerName: "requestCurrentSnapshotData",
    },
    requestCurrentSnapshotDataPhoto: {
      returnType: "json",
      unityLisenerName: "requestCurrentPhotoSnapshotData",
    },
    requestMaterialsOnProduct: {
      returnType: "json",
      unityLisenerName: "sendMaterialNamesOnObjectToEdit",
    },
    sendScreenshotAsBase64EncodedJpg: {
      returnType: "value",
      unityLisenerName: "sendScreenshotAsBase64EncodedJpg",
    },
    sendWorkPreviewAsBase64EncodedJpg: {
      returnType: "value",
      unityLisenerName: "sendWorkPreviewAsBase64EncodedJpg",
    },
    sendEdtiorScreenshotAsBase64EncodedJpg: {
      returnType: "value",
      unityLisenerName: "sendEdtiorScreenshotAsBase64EncodedJpg",
    },
    saveSnapshotData: {
      returnType: "json",
      unityLisenerName: "saveSnapshotData",
    },
    sendAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson: {
      returnType: "json",
      unityLisenerName:
        "sendAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson",
    },
    sendReportObject: {
      returnType: "json",
      unityLisenerName: "sendReportObject",
    },
  },
  messagingGameObjectName: "zerolensViewerAPI",
  senders: {
    lockObject: {
      unitySenderName: "setSelectedObjectLocked",
      parameter: true,
    },
    focusCameraToSelectedObjectOrObjectToEdit: {
      unitySenderName: "focusCameraToSelectedObjectOrObjectToEdit",
      parameter: false,
    },
    flipObjectVertial: {
      unitySenderName: "setDefaultRotationForSelectedObject",
      parameter: true,
    },
    flipObjectHorizontal: {
      unitySenderName: "setDefaultRotationForSelectedObject",
      parameter: true,
    },
    removeModifierAndRecordActionForUndoStack: {
      unitySenderName: "removeModifierAndRecordActionForUndoStack",
      parameter: true,
    },
    setDofEnabled: { unitySenderName: "setDofEnabled", parameter: true },
    setFocusMode: { unitySenderName: "setFocusMode", parameter: true },
    setDofLevel: { unitySenderName: "setDofLevel", parameter: true },
    setPhysicsUsable: { unitySenderName: "setPhysicsUsable", parameter: true }, // CameraController → setPhysicsUsable(usable): Sets physics usable on or off. Paremeter: "true" or "false".
    resetViewAndComposition: {
      unitySenderName: "resetViewAndComposition",
      parameter: false,
    }, // CameraController → resetViewAndComposition() : resets everything
    resetView: { unitySenderName: "resetView", parameter: false }, // CameraController → resetView() : resets only camera
    OnToolChanged: { unitySenderName: "OnToolChanged", parameter: true }, // CameraController → OnToolChanged(toolString) : Changes the interaction Tool. Allowed Parameters: "Rotate", "Move", "None", "Scale", or "View"
    setVerticalFoV: { unitySenderName: "setVerticalFoV", parameter: true }, // CameraController → setVerticalFoV(verticalFovInDegrees) : sets the vertical field of view of the main camera in degrees.
    setCameraTurnSpeedAroundSelf: {
      unitySenderName: "setCameraTurnSpeedAroundSelf",
      parameter: true,
    }, // CameraController → setCameraTurnSpeedAroundSelf(cameraTurnSpeedAroundSelf) : set the turn speed of the camera around it self. Default value is 0.03.
    setRotationAllowed: {
      unitySenderName: "setRotationAllowed",
      parameter: true,
    }, // CameraController → setRotationAllowed(allowed) : determine, if user can rotate the camera. Allowed Parameters: "true", "false".
    setMovementAllowed: {
      unitySenderName: "setMovementAllowed",
      parameter: true,
    }, // CameraController → setMovementAllowed(allowed) : determine, if user can move and zoom the camera. Allowed Parameters: "true", "false".
    abortAddObject: { unitySenderName: "abortAddObject", parameter: false }, // CameraController → abortAddObject() : Aborts object placement of the add object tool.
    setAlternativeInteractionMode: {
      unitySenderName: "setAlternativeInteractionMode",
      parameter: true,
    }, // CameraController → setAlternativeInteractionMode(): Switches alternative interaction mode on or off. Parameters: "true" or "false".
    sendTool: { unitySenderName: "sendTool", parameter: true }, // CameraController → sendTool(replaceNoneOrViewStatusWithLastUsedToolBool): Sends the last by the user selected tool (e.g. Rotate) to external Handler. Parameter: replaceNoneOrViewStatusWithLastUsedToolBool: if set to "true": "None" or "View" tool is replaced by the last used actual tool like "Rotate" or "Move". Will return "None" or "View" otherwise.
    connectToDBAndSendData: {
      unitySenderName: "connectToDBAndSendData",
      parameter: false,
    }, // Network → connectToDBAndSendData() : geathers snapshot data and sends the snapshot JSON as parameter of sendSnapshotDataToExternalHandler(string snapshotJSON).
    focusCanvas: { unitySenderName: "focusCanvas", parameter: true }, // Network → focusCanvas (p_focus) : is p_focus == "0" sets WebGLInput.captureAllKeyboardInput = false, to true otherwise.
    requestCurrentSnapshotData: {
      unitySenderName: "requestCurrentSnapsthotData",
      parameter: true,
    }, // Network → requestCurrentSnapsthotData(funcName): geathers snapshot data and sends the snapshot JSON as parameter of funcNameSnapshotData(string snapshotJSON).
    recreateScene: { unitySenderName: "recreateScene", parameter: true }, // SceneRecreator → recreateScene(json) : Recreates a snapshot. Parameter: Snapshot as JSON. For the JSON structure, see here.
    setCameraParameters: {
      unitySenderName: "setCameraParameters",
      parameter: true,
    }, // SceneRecreator → setCameraParameters(csv) : ransformation and rotation as comma seperated values: "horizontalFov,aspect,aperture,focusDistance,focusPointX,focusPointY,focusPointZ".If you do not want to set a value, just pass an empty string between commas, e.g.: ",,,1.56,,," to only set the focus distance. focus distance is overwritten if all three focusPoint coordinates are provided.
    setCameraPositionRotation: {
      unitySenderName: "setCameraPositionRotation",
      parameter: true,
    }, // SceneRecreator → setCameraPositionRotation(csv) : Sets Translation and Rotation of the main camera. Parameter: Transformation and rotation as comma seperated values: "tX,tY,tZ,rX,rY,rZ". If you do not want to set a value, just pass an empty string between commas, e.g.: ",,,90,90,90," to not set a position and only a rotation.
    changeRelativelyRotationScaleForSelectedObject: {
      unitySenderName: "changeRelativelyRotationScaleForSelectedObject",
      parameter: true,
    }, // SceneRecreator → changeRelativelyRotationScaleForSelectedObject(csv) : Changes Translation, Rotation and Scale for the by the user selected object relatively. Translation is added, Rotation done on top of previous rotation and scale is element-wise multiplied. Parameter: Transformation, rotation and scale as comma seperated values: "tX,tY,tZ,rX,rY,rZ,sX,sY,sZ"
    setPositionRotationScaleForSelectedObject: {
      unitySenderName: "setPositionRotationScaleForSelectedObject",
      parameter: true,
    }, // SceneRecreator → setPositionRotationScaleForSelectedObject(csv) : Sets Translation, Rotation and Scale for the by the user selected object. Parameter: Transformation, rotation and scale as comma separated values: "tX,tY,tZ,rX,rY,rZ,sX,sY,sZ"
    sendSelectedObjectTransformationDataViaExternalFunction: {
      unitySenderName:
        "sendSelectedObjectTransformationDataViaExternalFunction",
      parameter: true,
    }, // SceneRecreator → sendSelectedObjectTransformationDataViaExternalFunction(csv) : sends information about the selectedObject as parameter of  external listener. Format: "tX,tY,tZ,rX,rY,rZ,sX,sY,sZ". If there is no GameObject selected, an empty string is sent.
    // loadNewEnvironment: { unitySenderName: 'loadNewEnvironment', parameter: true },                                  // SceneLoader → loadNewEnvironment(assetBundleURLandModifierJSON) : Depreciated since 2019-10-08: use SceneRecreator instead. Loads a new environment. Parameter: assetbundleURL and ModifierComponent Array as JSON are separated by comma
    loadNewProductOrObject: {
      unitySenderName: "loadNewProductOrObject",
      parameter: true,
    }, // SceneLoader → loadNewProductOrObject(fbid_abid_type) : Loads a new product or lifestyleobject to be placed by the user. Parameter: String as comma seperated values, FirebaseID, assetBundleIdentifier, type. E.g.: "TYafhiXhYK9BKHJlg5yk [RS] products/waterdrop_box_defense [RS] product [RS] [{}]")
    // loadNewProductOrObject: { unitySenderName: 'loadNewProductOrObject', parameter: true },                          // SceneLoader → loadNewProductOrObject(fbid_abid_type_modifier) : Loads a new product or lifestyleobject to be placed by the user. Parameter: String as RS seperated values, FirebaseID, assetBundleIdentifier, type, modifiers. E.g.: "TYafhiXhYK9BKHJlg5yk [RS] products/waterdrop_box_defense [RS] product [RS] [{}]")
    loadNewProductOrObjectWithJSON: {
      unitySenderName: "loadNewProductOrObjectWithJSON",
      parameter: true,
    }, // SceneLoader -> loadNewProductOrObjectWithJSON(json): loads obj or prod just like its part of a snapshot
    replaceSelectedAndLoadNewProductOrObject: {
      unitySenderName: "replaceSelectedAndLoadNewProductOrObject",
      parameter: true,
    }, // SceneLoader → replaceSelectedAndLoadNewProductOrObject(csv) : Replaces the selected object with a new one. Parameters see SceneLoader.loadNewProductOrObject above.
    replaceSelectedAndLoadNewProductOrObjectWithJSON: {
      unitySenderName: "replaceSelectedAndLoadNewProductOrObjectWithJSON",
      parameter: true,
    },
    deleteSelectedObject: {
      unitySenderName: "deleteSelectedProduct",
      parameter: false,
    }, // SceneLoader → deleteSelectedObject() : Deletes the selevted Object;
    getMaterialInformation: {
      unitySenderName: "getMaterialInformation",
      parameter: false,
    }, // ModifierManager → getMaterialInformation() : Sends material information about the environment and selectod object as parameter of sendAllMaterials(materialInformation).
    requestAllModifiersOnEnvironment: {
      unitySenderName: "requestAllModifiersOnEnvironment",
      parameter: false,
    }, // ModifierManager → requestAllModifiersOnEnvironment() : sends all modifiers currently applied as a JSON string as parameter of sendModifiersOnEnvironment
    applyModifierToEnvironment: {
      unitySenderName: "applyModifierToEnvironment",
      parameter: true,
    }, // ModifierManager → applyModifierToEnvironment(modifierUpdateJSONstring) : applies a modifier provided as a JSON to the environment. If they already exist, they are updated, otherwise added. Also see Modifier structure
    applyModifierToSelectedObject: {
      unitySenderName: "applyModifierToSelectedObject",
      parameter: true,
    }, // ModifierManager → applyModifierToSelectedObject(modifierUpdateJSONstring) : applies a modifier provided as a JSON to the selected object. If they already exist, they are updated, otherwise added. If no object is selected, nothing happens. Also see Modifier structure
    undo: { unitySenderName: "undo", parameter: false }, // UndoManager → undo(): undoes the last action.
    redo: { unitySenderName: "redo", parameter: false }, // UndoManager → redo(): redoes the last undone action if it exists.
    pushExternalEvent: {
      unitySenderName: "pushExternalEvent",
      parameter: true,
    }, // UndoManager → pushExternalEvent(eventstring): Can be used to tell unity to push an external event such as aspect ratio change or anything else that unity is not aware of. In case of an undo, the same string is returned 1:1 via
    lockGlobalObjectTransform: {
      unitySenderName: "lockGlobalObjectTransform",
      parameter: false,
    }, // TutorialUtil → lockGlobalObjectTransform(): All Objects will have locked transforms
    resetGlobalObjectTransformLock: {
      unitySenderName: "resetGlobalObjectTransformLock",
      parameter: false,
    }, // TutorialUtil → resetGlobalObjectTransformLock(): Resets all object transform locks to the state before last time lockGlobalObjectTransform was called.
    createTutorialGhost: {
      unitySenderName: "createTutorialGhost",
      parameter: true,
    }, // TutorialUtil → createTutorialGhost(PosRotScale): Creates an Object Ghost on a positon. Parameters: On String as CSV: tX,tY,tZ,rX,rY,rZ,sX,sY,sZ,htmlcolorWithHashSymbol (color is optional)
    deleteTutorialGhosts: {
      unitySenderName: "deleteTutorialGhosts",
      parameter: false,
    }, // TutorialUtil → deleteTutorialGhosts(): Delets all tutorial Ghosts
    fireworks: { unitySenderName: "fireworks", parameter: false }, // TutorialUtil → fireworks(): Shoots fireforks upwards from (0,0,0)
    // Changes the mode to the specified one. Currently supported: "studio" and "editor"
    SetInteractionMode: {
      unitySenderName: "setUnityInteractionMode",
      parameter: true,
    },
    // (compoundString):loads a 3d file from an url. Param: URL[RS]optional_filetype[RS]localPath. Parameters are separated with the "Record Separator" [RS] unicode symbol. Filetype is e.g. "glb" or "fbx" and can be empty if unknown. Local path if the full path to the file if it is available locally otherwise empty.
    load3dFileFromURL: {
      unitySenderName: "load3dFileFromURL",
      parameter: true,
    },
    requestMaterialsOnProduct: {
      unitySenderName: "sendMaterialNamesOnObjectToEdit",
      parameter: false,
    },
    highlightMaterialInEditMode: {
      unitySenderName: "highlightMaterialInEditMode",
      parameter: true,
    },
    sendScreenshotAsBase64EncodedJpg: {
      unitySenderName: "sendScreenshotAsBase64EncodedJpg",
      parameter: true,
    },
    getAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson: {
      unitySenderName:
        "getAxisAlignedBoundingBoxOfSelectedObjectOrObjectToEditAsJson",
      parameter: false,
    },
  },
};
