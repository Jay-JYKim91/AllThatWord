// import { firebaseApp } from './firebase';
import { Folder } from 'App';
import { getDatabase, onValue, ref, remove, set, off } from 'firebase/database';
import { WordProp } from '../page/Search';

const db = getDatabase();

export function syncWords(userId: string, onUpdate: (data: any) => void) {
  const syncRef = ref(db, `${userId}/folders`);
  onValue(syncRef, (snapshot) => {
    const data = snapshot.val();
    return data && onUpdate(data);
  });
  return () => off(syncRef);
}

export function saveWordToFolder(
  userId: string,
  word: WordProp,
  folderId: string
) {
  set(ref(db, `${userId}/folders/${folderId}/words/${word.id}`), word);
}

export function saveWordToUser(userId: string, word: WordProp) {
  set(ref(db, `${userId}/allWords/${word.id}`), word);
}

export function addFolder(userId: string, folder: Folder) {
  set(ref(db, `${userId}/folders/${folder.id}`), folder);
}

export function removeWord(userId: string, wordId: string) {
  const wordRef = ref(db, `${userId}/words/${wordId}`);
  remove(wordRef);
}
