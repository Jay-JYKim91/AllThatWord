import { Folder, LooseObj } from 'App';
import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  off,
  get,
  child,
} from 'firebase/database';
import { WordProp } from '../page/Search';

const db = getDatabase();

export function syncWords(userId: string, onUpdate: (data: {}) => void) {
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
  remove(wordRefInAllWords);
  remove(wordRefInFolder);
}

export function removeFolder(
  userId: string,
  folderId: string,
  words: LooseObj
) {
  console.log(words);
  const folder = ref(db, `${userId}/folders/${folderId}`);
  set(ref(db, `${userId}/allWords`), words);
  remove(folder);
}

export function checkNewUser(userId: string) {
  const dbRef = ref(db);

  get(child(dbRef, `${userId}`))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        set(ref(db, `${userId}/isSignIn`), true);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
