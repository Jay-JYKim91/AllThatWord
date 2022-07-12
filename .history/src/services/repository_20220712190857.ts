// import { firebaseApp } from './firebase';
import { getDatabase, onValue, ref, remove, set, off } from 'firebase/database';
import { Word } from '../page/Search';

const db = getDatabase();

export function syncWords(userId: string, onUpdate: (data: object) => {}) {
  const syncRef = ref(db, `${userId}/words`);
  onValue(syncRef, (snapshot) => {
    const data = snapshot.val();
    data && onUpdate(data);
  });
  return () => off(syncRef);
}

export function saveWord(userId: string, word: Word) {
  set(ref(db, `${userId}/words/${word.id}`), word);
}

export function removeWord(userId: string, wordId: string) {
  const wordRef = ref(db, `${userId}/words/${wordId}`);
  remove(wordRef);
}
