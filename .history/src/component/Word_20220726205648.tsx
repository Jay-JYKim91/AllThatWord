import React, { useContext } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { GiSpeaker } from 'react-icons/gi';
import { WordProp } from 'page/Search';
import { useNavigate } from 'react-router-dom';
import { LooseObj } from 'App';
import * as repo from '../services/repository';
import { AuthContext } from '../context/authContext';

type Prop = {
  word: WordProp;
  setWords: React.Dispatch<React.SetStateAction<LooseObj>>;
  words: LooseObj;
  setFolders: React.Dispatch<React.SetStateAction<LooseObj>>;
};

const Word: React.FC<Prop> = ({ word, setWords, words, setFolders }) => {
  const navigate = useNavigate();
  const userInfo = useContext(AuthContext);

  const handleDelete = (id: string) => {
    setWords((words) => {
      const updated = { ...words };
      delete updated[id];
      return updated;
    });
    setFolders((folders) => {
      const updated = { ...folders };
      const test = words[id];
      console.log(test['folderId']);
      console.log(updated[test['folderId']]['words'][word]);
      // delete updated[id].words[word]
      return updated;
    });

    // setFolders에서 해줘야하나? 업데이트가 바로 안됨

    // repo.removeWord(userInfo!.uid, id, words[id]);
  };

  const arr: string[] = [];

  return (
    <div className="py-2 px-3 bg-neutral-200 mb-2 rounded" key={word.id}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="font-heading_font text-2xl">{word.id}</p>
          <button type="button" onClick={() => handleDelete(word.id)}>
            <RiDeleteBin5Fill className="text-2xl text-primary-900" />
          </button>
        </div>
        {word.phonetic && word.pronunciation && (
          <div className="flex items-center mb-4">
            <p className="text-neutral-600 text-md">{word.phonetic}</p>
            <button
              type="button"
              className="ml-2"
              onClick={() => {
                new Audio(word.pronunciation).play();
              }}
            >
              <GiSpeaker className="text-2xl" />
            </button>
          </div>
        )}
      </div>

      {word.meanings.map((meaning, index) => {
        if (index > 0) {
          arr.push(word.meanings[index - 1].partOfSpeech);
        }
        const marginBottom = index === word.meanings.length - 1 ? '' : 'mb-1';

        return (
          !arr.includes(meaning.partOfSpeech) && (
            <div key={meaning.partOfSpeech}>
              <p className="text-primary-900 font-bold mr-2 min-w-[105px]">
                {meaning.partOfSpeech.toUpperCase()}
              </p>
              <p className={marginBottom}>
                {meaning.definitions[0].definition}
              </p>
            </div>
          )
        );
      })}
      <div className="text-right mt-2 mb-1">
        <button
          type="button"
          className="bg-primary-900 text-white py-1 px-4 rounded"
          onClick={() => navigate(`/search/${word.id}`)}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default Word;
