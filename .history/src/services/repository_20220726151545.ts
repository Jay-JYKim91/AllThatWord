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
  set(ref(db, `${userId}/allWords/${word.id}`), { folderId: folderId});
}

export function addFolder(userId: string, folder: Folder) {
  set(ref(db, `${userId}/folders/${folder.id}`), folder);
}

export function removeWord(userId: string, wordId: string, folderId: {folderId: string}) {
  const wordRefInAllWords = ref(db, `${userId}/allWords/${wordId}`);
  const wordRefInFolder = ref(db, `${userId}/folders/${folderId}/words/${wordId}`);
  remove(wordRefInAllWords);
  remove(wordRefInFolder);
}
