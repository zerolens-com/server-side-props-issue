// load core firebase SDK
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import "firebase/auth";
import "firebase/analytics";
import { getPublicConfig } from "@constants";

const FIREBASE_INDICES = {
  PHOTOS: "Snapshots",
  OBJECTS: "Objects",
  PRODUCTS: "Products",
  MATERIALS: "Materials",
  CMS: "CMS",
  ORGANIZATION: "Organizations",
  USER: "Users",
  DEPLYOMENT: "deployment",
  TEMPLATES: "ImageEnvironment",
  NOTIFICATIONS: "Notifications",
  ENVIRONMENTS: "Environments",
};

const FIREBASE_ORGANIZATION_SUBCOLLECTIONS = {
  ASSETS: "Assets",
};

const FIREBASE_USERS_SUBCOLLECTIONS = {
  WORKS: "Works",
  HISTORY: "History",
};

const FIREBASE_SNAPSHOTS_SUBCOLLECTIONS = {
  HISTORY: "StatusReport",
};

if (!firebase.apps.length) {
  firebase.initializeApp(getPublicConfig().firebase);
}

// TODO
// As httpOnly cookies are to be used, do not persist any state client side.
// firebase.auth().setPersistence(firebase.auth.Auth?.Persistence?.NONE);

// firebase utils
const db = firebase.firestore();
const functions = firebase.app().functions();

const storageRef = firebase.storage().ref();
const serverTime = firebase.firestore.FieldValue.serverTimestamp();
const deleteField = firebase.firestore.FieldValue.delete();

export {
  db,
  storageRef,
  serverTime,
  deleteField,
  functions,
  firebase,
  FIREBASE_INDICES,
  FIREBASE_ORGANIZATION_SUBCOLLECTIONS,
  FIREBASE_USERS_SUBCOLLECTIONS,
  FIREBASE_SNAPSHOTS_SUBCOLLECTIONS,
};
