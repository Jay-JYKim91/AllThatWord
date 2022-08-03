// import { firebaseApp } from './firebase';
import { Folder } from 'App';
import { getDatabase, onValue, ref, remove, set, off } from 'firebase/database';
import { WordProp } from '../page/Search';

const db = getDatabase();

export function syncWords(userId: string, onUpdate: (data: any) => void) {
  const syncRef = ref(db, `${userId}`);
  onValue(syncRef, (snapshot) => {
    const data = snapshot.val();
    return data && onUpdate(data);
  });
  return () => off(syncRef);
}

export function saveWord(userId: string, word: WordProp, folderId: string) {
  set(ref(db, `${userId}/folders/${folderId}/words/${word.id}`), word);
  set(ref(db, `${userId}/allWords/${word.id}`), { folderId });
}

export function addFolder(userId: string, folder: Folder) {
  set(ref(db, `${userId}/folders/${folder.id}`), folder);
}

export function removeWord(
  userId: string,
  wordId: string,
  folder: { folderId: string }
) {
  const wordRefInAllWords = ref(db, `${userId}/allWords/${wordId}`);
  const wordRefInFolder = ref(
    db,
    `${userId}/folders/${folder.folderId}/words/${wordId}`
  );
  // console.log(`${userId}/folders/${folder.folderId}/words/${wordId}`);
  remove(wordRefInAllWords);
  remove(wordRefInFolder);
}

export function removeFolder(userId: string, folderId: string, words) {
  const folder = ref(db, `${userId}/folders/${folderId}`);
  set(ref(db, `${userId}/allWords`), words);
  // console.log(`${userId}/folders/${folder.folderId}/words/${wordId}`);
  remove(folder);
}

export function checkNewUser(userId: string) {
  console.log(userId);
  const syncRef = ref(db, `${userId}`);
  console.log(db);
  console.log(syncRef);
//   _orderByCalled: false
// _path: Path {pieces_: Array(1), pieceNum_: 0}
// _queryParams: QueryParams {limitSet_: false, startSet_: false, startNameSet_: false, startAfterSet_: false, endSet_: false, …}
// _repo: Repo {repoInfo_: RepoInfo, forceRestClient_: false, authTokenProvider_: FirebaseAuthTokenProvider, appCheckProvider_: AppCheckTokenProvider, dataUpdateCount: 2, …}
// key: (...)
// parent: (...)
// ref: (...)
// root: (...)
// _queryIdentifier: (...)
// _queryObject: (...)
// [[Prototype]]: QueryImpl

}
