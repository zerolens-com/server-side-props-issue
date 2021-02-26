import { storageRef, firebase } from "@services/firebase";
import { STORAGE_ORG_FOLDER, STORAGE_USER_FOLDER } from "@constants";
import debounce from "lodash/debounce";

export interface destrucuredPropsOptionUpdate {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}
export interface destrucuredPropsOptionCompleted {
  downloadUrl: string;
  fileName: string;
  path: string;
}

type UPLOAD_STATES = "cancel" | "error" | "paused" | "running" | "success";

export type { UPLOAD_STATES };

export interface onStateChanged {
  (
    state: firebase.storage.TaskState,
    payload:
      | destrucuredPropsOptionCompleted
      | destrucuredPropsOptionUpdate
      | Error
  ): void;
}

export interface UploadFileParams {
  file: File;
  subfolderName: string;
  orgOrUser: "org" | "user";
  uidOrOid: string;
  onStateChanged: onStateChanged;
  withDateInFileName?: boolean;
}

const debouncedUploadFile = debounce(
  async ({
    file,
    subfolderName,
    orgOrUser,
    uidOrOid,
    onStateChanged,
    withDateInFileName = true,
  }: UploadFileParams) =>
    await uploadFile({
      file,
      subfolderName,
      orgOrUser,
      uidOrOid,
      onStateChanged,
      withDateInFileName,
    }),
  5000
);

export { debouncedUploadFile };

function uploadFile({
  file,
  subfolderName,
  orgOrUser,
  uidOrOid,
  onStateChanged,
  withDateInFileName = true,
}: UploadFileParams): firebase.storage.UploadTask {
  const currentDate = new Date();

  const fileName = withDateInFileName
    ? `${currentDate.toISOString()}_${file.name}`
    : file.name;

  const filePath = `${
    orgOrUser === "org" ? STORAGE_ORG_FOLDER : STORAGE_USER_FOLDER
  }/${uidOrOid}/${subfolderName}/${fileName}`;

  let fileRef = storageRef.child(filePath);

  let fileUploadTask = fileRef.put(file);

  // Listen for state changes, errors, and completion of the upload.
  fileUploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot: firebase.storage.UploadTaskSnapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      let progress = snapshot.bytesTransferred / snapshot.totalBytes;
      console.log(`⬆️ Upload is ${progress}% done`);

      onStateChanged(snapshot.state, {
        progress,
        bytesTransferred: snapshot.bytesTransferred,
        totalBytes: snapshot.totalBytes,
      });
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors

      onStateChanged("error", error);

      switch (error.name) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;

        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      fileUploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadUrl: string) => {
          onStateChanged("success", {
            downloadUrl,
            fileName: fileUploadTask.snapshot.ref.name.split("Z_")[1],
            path: filePath,
          }); // removing the ISO Date string since this will become the file name
        });
    }
  );

  return fileUploadTask;
}

export default uploadFile;
