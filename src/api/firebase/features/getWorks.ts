import { NUMBER_OF_DOCS_TO_FETCH_EACH_TIME } from "@constants";
import { Work } from "@models/works/types";
import {
  db,
  FIREBASE_INDICES,
  FIREBASE_USERS_SUBCOLLECTIONS,
} from "@services/firebase";

export interface WorkFetchReturn {
  works: Work[];
  lastId: string;
  hasMore: boolean;
}

async function getWorks(uid: string): Promise<WorkFetchReturn> {
  const response = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .orderBy("createdAt", "desc")
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME)
    .get();

  // workRef.data;
  if (response.docs.length === 0) {
    return { works: [] as Work[], lastId: null, hasMore: false };
  }

  return parseDocsToWorks(response.docs);
}

async function getWorksAfterId(
  uid: string,
  lastId: string
): Promise<WorkFetchReturn> {
  const response = await db
    .collection(FIREBASE_INDICES.USER)
    .doc(uid)
    .collection(FIREBASE_USERS_SUBCOLLECTIONS.WORKS)
    .orderBy("createdAt", "desc")
    .startAfter(lastId)
    .limit(NUMBER_OF_DOCS_TO_FETCH_EACH_TIME)
    .get();

  if (response.docs.length === 0) {
    return { works: [] as Work[], lastId: null, hasMore: false };
  }

  return parseDocsToWorks(response.docs);
}

const parseDocsToWorks = (docs): WorkFetchReturn => {
  const works = [] as Work[];
  docs.forEach((doc) => {
    const snapshot: Work = { ...doc.data() };
    const { id } = doc;

    const work = snapshot;
    work.id = id;
    works.push(work);
  });

  return { works, lastId: docs[docs.length - 1], hasMore: true };
};

export default getWorks;
export { parseDocsToWorks, getWorksAfterId, getWorks };
