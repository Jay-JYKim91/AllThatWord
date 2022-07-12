// import { firebaseApp } from './firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { Word } from '../page/Search';

export function saveWord(userId: string, word: Word) {
  const db = getDatabase();
  set(ref(db, `${userId}/words/${word.id}`), word)
}

export function syncWords() {

}