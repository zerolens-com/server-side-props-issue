import { NotificationPayload } from "@models/notifications/types";
import { GetPhotosReturn } from "@models/photos/types";
import { ProductsDatabaseReference } from "@models/products/types";
import { functions } from "@services/firebase";

// features
import {
  Organization,
  Photo,
  UpdateSnapshotPreviewParams,
  ZerolensProduct,
} from "@types/models";

import changePhotoNameFeature from "./firebase/features/changePhotoName";
import createNewProductWithModelPathFeature, {
  CreateProductParams,
} from "./firebase/features/createNewProductWithModelPath";
import deletePhotoByIdFeature from "./firebase/features/deletePhotoById";
import getMainCMSData from "./firebase/features/getMainCMSData";
import getNotificationsFeature from "./firebase/features/getNotifications";
import getOrganizationFeature from "./firebase/features/getOrganization";
import getPhotoByIdFeature from "./firebase/features/getPhotoById";
import getPhotosFeature from "./firebase/features/getPhotos";
import getPhotosAfterIdFeature from "./firebase/features/getPhotosAfterId";
import getProductsFeature from "./firebase/features/getProducts";
import getProductsAfterIdFeature from "./firebase/features/getProductsAfterId";
import getRenderCost from "./firebase/features/getRenderCost";
import getSnapshotBySidFeature from "./firebase/features/getSnapshotBySid";
import getTemplateByIdFeature from "./firebase/features/getTemplateById";
import getUnityPathsFeature from "./firebase/features/getUnityPaths";
import subscribeToActivePhotosByCollectionFeature from "./firebase/features/subscribeToActivePhotosByCollection";
import subscribeToOrganization from "./firebase/features/subscribeToOrganization";
import subscribeToSubscription from "./firebase/features/subscribeToSubscription";
import updateProductFeature from "./firebase/features/updateProductFeature";
import updateSnapshotSignedUrl from "./firebase/features/updateSnapshotSignedUrl";
import uploadFileFeature, {
  uploadFileProps,
} from "./firebase/features/uploadFile";

const createInvitation = functions.httpsCallable("createInvitation");
const acceptInvitation = functions.httpsCallable("acceptInvitation");
const declineInvitation = functions.httpsCallable("declineInvitation");
const deleteUserFromOrg = functions.httpsCallable("deleteUserFromOrg");

const createTestSnapshot = functions.httpsCallable("createTestSnapshotData");
const createSnapshot = functions.httpsCallable("createSnapshot");
const removeWatermarks = functions.httpsCallable("removeWatermarks");
const createOrganization = functions.httpsCallable("createOrganization");

const createStripeSubscription = functions.httpsCallable(
  "createStripeSubscription"
);
const createPortalLink = functions.httpsCallable("createPortalLink");
const changeSubscription = functions.httpsCallable("changeSubscription");
const retrieveUpcomingInvoice = functions.httpsCallable(
  "retrieveUpcomingInvoice"
);

const getOrganization = (oid: string): Promise<Organization> =>
  getOrganizationFeature(oid);

const getPhotoById = (sid: string): Promise<Photo> => getPhotoByIdFeature(sid);
const deletePhotoById = (sid: string): Promise<void> =>
  deletePhotoByIdFeature(sid);

const changePhotoName = (sid: string, name: string): Promise<boolean> =>
  changePhotoNameFeature(sid, name);
const updateProduct = (
  pid: string,
  updateValues: Partial<ZerolensProduct>
): Promise<ZerolensProduct> => updateProductFeature(pid, updateValues);

const getProducts = (
  oid: string,
  isLive = true
): Promise<ProductsDatabaseReference> => getProductsFeature(oid, isLive);

const getNotifications = (uid: string): Promise<NotificationPayload> =>
  getNotificationsFeature(uid);

const getUnreadNotifications = (uid: string): Promise<NotificationPayload> =>
  getUnreadNotifications(uid);

const getNotificationsAfterId = (
  lastId: firebase.firestore.DocumentReference,
  uid: string
): Promise<NotificationPayload> => getNotificationsAfterId(lastId, uid);

const getProductsAfterId = (
  lastId: firebase.firestore.DocumentReference,
  oid: string,
  isLive = true
): Promise<ProductsDatabaseReference> =>
  getProductsAfterIdFeature(lastId, oid, isLive);

const getPhotos = (
  uidOrOid: string,
  isForOrganization = false,
  status = "completed"
): Promise<GetPhotosReturn> =>
  getPhotosFeature(uidOrOid, isForOrganization, status);

const getPhotosAfterId = (
  lastId: firebase.firestore.DocumentReference,
  uidOrOid: string,
  isForOrganization = false,
  status = "completed"
): Promise<GetPhotosReturn> =>
  getPhotosAfterIdFeature(lastId, uidOrOid, isForOrganization, status);

const subscribeToActivePhotosByCollection = (
  uidOrOid: string,
  subCollection: string,
  isForOrganization: boolean,
  callback: (payload: Photo[]) => void
): Promise<boolean> =>
  subscribeToActivePhotosByCollectionFeature(
    uidOrOid,
    subCollection,
    isForOrganization,
    callback
  );

const getUnityPaths = (): Promise<any> => getUnityPathsFeature();

const getSnapshotBySid = (sid: string) => getSnapshotBySidFeature(sid);

const setSignedPreviewUrlToSid = (payload: UpdateSnapshotPreviewParams) =>
  updateSnapshotSignedUrl(payload);

const getTemplateById = (id: string): any => getTemplateByIdFeature(id);

const uploadFile = (payload: uploadFileProps): firebase.storage.UploadTask =>
  uploadFileFeature(payload);

const createNewProductWithModelPath = (
  payload: CreateProductParams
): Promise<{
  docId: string;
  data: firebase.firestore.DocumentData;
}> => createNewProductWithModelPathFeature(payload);

export {
  createOrganization,
  getPhotos,
  getPhotosAfterId,
  getOrganization,
  createTestSnapshot,
  subscribeToActivePhotosByCollection,
  getPhotoById,
  deletePhotoById,
  changePhotoName,
  getProducts,
  getProductsAfterId,
  updateProduct,
  getUnityPaths,
  getSnapshotBySid,
  getMainCMSData,
  getRenderCost,
  getTemplateById,
  createStripeSubscription,
  createPortalLink,
  changeSubscription,
  retrieveUpcomingInvoice,
  createSnapshot,
  createNewProductWithModelPath,
  createInvitation,
  acceptInvitation,
  declineInvitation,
  deleteUserFromOrg,
  getNotifications,
  getNotificationsAfterId,
  getUnreadNotifications,
  setSignedPreviewUrlToSid,
  subscribeToOrganization,
  subscribeToSubscription,
  removeWatermarks,
};
