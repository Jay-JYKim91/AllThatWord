// import { firebaseApp } from './firebase';
import { getDatabase, ref, remove, set } from 'firebase/database';
import { Word } from '../page/Search';

const db = getDatabase();

export function saveWord(userId: string, word: Word) {
  set(ref(db, `${userId}/words/${word.id}`), word);
}

export function removeWord(userId: string, wordId: string) {
  const wordRef = ref(db, `${userId}/words/${wordId}`);
  remove(wordRef);
}
