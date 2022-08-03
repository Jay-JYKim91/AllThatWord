import SearchBar from 'component/SearchBar';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  useParams,
  Link,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom';
import { MdOutlineError } from 'react-icons/md';
import { GiSpeaker } from 'react-icons/gi';
import { HiDocumentAdd, HiDocumentRemove } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { LooseObj } from 'App';
import * as repo from 'services/repository';
import searchByQuery from '../services/dictionaryAPI';
import { AuthContext } from '../context/authContext';

type Definition = {
  antonyms: string[];
  definition: string;
  example?: string;
  synonyms: string[];
};

type Meaning = {
  antonyms: string[];
  definitions: Definition[];
  partOfSpeech: string;
  synonyms: string[];
};

type Phonetic = {
  audio: string;
  license?: object;
  sourceUrl?: string;
  text: string;
};

type Props = {
  words: LooseObj;
  setWords: React.Dispatch<React.SetStateAction<LooseObj>>;
  folders: LooseObj;
  setFolders: React.Dispatch<React.SetStateAction<LooseObj>>;
};

type Data = {
  license: object;
  meanings: Meaning[];
  phonetic: string;
  phonetics: Array<Phonetic>;
  sourceUrls: [];
  word: string;
};

export type WordProp = {
  id: string;
  phonetic?: string;
  pronunciation?: string;
  meanings: Meaning[];
};

const Search: React.FC<Props> = ({ words, setWords, folders, setFolders }) => {
  const { query } = useParams();
  const userInfo = useContext(AuthContext);
  const navigate: NavigateFunction = useNavigate();
  const [folderName, setFolderName] = useState('');

  const { isLoading, isError, data, refetch } = useQuery(
    'searchByQuery',
    () => searchByQuery(query!),
    { retry: false }
  );

  useEffect(() => {
    refetch();
  }, [query]);

  if (isLoading) {
    return (
      <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
        <SearchBar query={query} imageURL="../search.png" />
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="sk-folding-cube top-[45%] left-[45%] lg:top-[25%]">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
        <SearchBar query={query} imageURL="../search.png" />
        <div className="py-20 font-heading_font text-center">
          <MdOutlineError className="text-6xl text-primary-900 m-auto" />
          <p className="mt-4 text-xl font-body1_font">
            No results found for &apos;{query}&apos;
            <br />
            Please try another search.
          </p>
        </div>
      </div>
    );
  }

  const findAudioSrc = (phonetics: Array<Phonetic>) => {
    let src = '';

    for (let i = 0; i < phonetics.length; i++) {
      if (phonetics[i].audio !== '') {
        src = phonetics[i].audio;
        break;
      }
    }

    return src;
  };

  const handleSave = (data: Data) => {
    if (!userInfo) {
      alert('You need to login to save this word.');
      navigate('/login');
    } else {
      const modal = document.getElementById('modal');
      modal!.style.display = 'block';
      // const src = findAudioSrc(data.phonetics);
      // const word: WordProp = {
      //   id: data.word,
      //   phonetic: data.phonetic,
      //   pronunciation: src,
      //   meanings: data.meanings,
      // };
      // const updated: LooseObj = { ...words };
      // updated[word.id] = word;
      // setWords(updated);
      // repo.saveWord(userInfo.uid, word);
    }
  };

  const handleDelete = (id: string) => {
    setWords((words) => {
      const updated = { ...words };
      delete updated[id];
      return updated;
    });
    repo.removeWord(userInfo!.uid, id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const date = Date.now();
    setFolders({
      date: {
        id: date,
        name: folderName,
        word: {},
      },
    });
  };

  const handlePlaySound = (src: string) => {
    new Audio(src).play();
  };

  const handleAddFolder = () => {
    console.log(typeof date);
  };

  const arr: string[] = [];

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar query={query} imageURL="../search.png" />
      <div className="py-4 max-w-2xl m-auto dark:text-white">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-heading_font font-bold">{query}</span>
          {data.word in words ? (
            <button type="button" onClick={() => handleDelete(data.word)}>
              <HiDocumentRemove className="text-2xl md:text-4xl text-primary-900 dark:text-white" />
            </button>
          ) : (
            <div className="relative">
              <button type="button" onClick={() => handleSave(data)}>
                <HiDocumentAdd className="text-2xl md:text-4xl text-primary-900 dark:text-white" />
              </button>
              <div
                className="bg-yellow-400 w-40 hidden absolute right-0 p-4"
                id="modal"
              >
                <button
                  type="button"
                  className="flex"
                  onClick={handleAddFolder}
                >
                  <BsPlusLg className="mr-2" />
                  Add new folder
                </button>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(event) => setFolderName(event.target.value)}
                  />
                  <button type="submit"></button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center mb-4">
          {data.phonetic && (
            <p className="text-neutral-600 dark:text-neutral-200">
              {data.phonetic}
            </p>
          )}
          {data.phonetics.length !== 0 && (
            <button
              type="button"
              className="ml-2"
              onClick={() => {
                const src = findAudioSrc(data.phonetics);
                handlePlaySound(src);
              }}
            >
              <GiSpeaker className="text-3xl" />
            </button>
          )}
        </div>

        {data.meanings.map((meaning: Meaning, index: number) => {
          if (index > 0) {
            arr.push(data.meanings[index - 1].partOfSpeech);
          }

          return (
            !arr.includes(meaning.partOfSpeech) && (
              <div key={meaning.partOfSpeech}>
                {index !== 0 && (
                  <hr className="border-primary-700 opacity-40 my-4" />
                )}
                <p className="text-primary-900 font-bold text-lg mb-1 dark:text-neutral-200">
                  {meaning.partOfSpeech[0].toUpperCase() +
                    meaning.partOfSpeech.substr(1)}
                </p>
                {meaning.definitions.map(
                  (definition: Definition, i: number) => {
                    return (
                      <div key={definition.definition} className="mb-2">
                        <div className="flex">
                          <p className="mr-2">{i + 1}.</p>
                          <p>{definition.definition}</p>
                        </div>
                        {definition.example && (
                          <p className="ml-3 text-neutral-500 dark:text-neutral-300">
                            &#47;&#47; {definition.example}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
                <div>
                  {meaning.synonyms.length !== 0 && (
                    <div>
                      <p className="font-heading_font text-lg mb-1">Synonyms</p>
                      <div className="flex flex-wrap text-neutral-600 dark:text-primary-900">
                        {meaning.synonyms.map((synonym) => {
                          const url = `/search/${synonym}`;
                          // console.log(synonym);
                          return (
                            <span
                              className="mr-1 mb-1 px-2 bg-neutral-200"
                              key={synonym}
                            >
                              <Link to={url}>{synonym}</Link>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {meaning.antonyms.length !== 0 && (
                    <div>
                      <p className="font-heading_font mb-1">Antonyms</p>
                      <div className="flex flex-wrap text-neutral-600 dark:text-primary-900">
                        {meaning.antonyms.map((antonym) => {
                          const url = `/search/${antonym}`;
                          return (
                            <span
                              className="mr-1 mb-1 px-2 bg-neutral-200"
                              key={antonym}
                            >
                              <Link to={url}>{antonym}</Link>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          );
        })}
        <div className="text-right text-neutral-500 dark:text-neutral-200">
          <span>License:&nbsp;</span>
          <a href={data.license.url} target="_blank" rel="noreferrer">
            {data.license.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Search;
