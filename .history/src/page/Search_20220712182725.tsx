import SearchBar from 'component/SearchBar';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { MdOutlineError } from 'react-icons/md';
import { GiSpeaker } from 'react-icons/gi';
import { HiDocumentAdd, HiDocumentRemove } from 'react-icons/hi';
import { LooseObj } from 'App';
import { searchByQuery } from '../services/dictionaryAPI';
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
};

type Data = {
  license: object;
  meanings: Meaning[];
  phonetic: string;
  phonetics: Array<Phonetic>;
  sourceUrls: [];
  word: string;
};

export type Word = {
  id: string;
  phonetic: string;
  pronunciation: string;
  meanings: Meaning[];
};

// interface LooseObj {
//   [key: string]: object;
// }

const Search: React.FC<Props> = ({ words, setWords }) => {
  const { query } = useParams();
  const userInfo = useContext(AuthContext);

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
        <SearchBar />
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
        <SearchBar />
        <div className="py-20 font-heading_font text-center">
          <MdOutlineError className="text-6xl text-primary-900 m-auto" />
          <p className="mt-4 text-xl font-body1_font">
            Something went wrong.
            <br />
            Please try again.
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
    } else {
      const src = findAudioSrc(data.phonetics);

      const word: Word = {
        id: data.word,
        phonetic: data.phonetic,
        pronunciation: src,
        meanings: data.meanings,
      };

      const updated: LooseObj = { ...words };
      updated[word.id] = word;
      setWords(updated);
    }
  };

  const handleDelete = (id: string) => {
    setWords((words) => {
      const updated = { ...words };
      delete updated[id];
      return updated;
    });
  };

  const handlePlaySound = (src: string) => {
    new Audio(src).play();
  };

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar />
      <div className="py-4">
        <div className="flex items-center justify-between">
          <span className="text-4xl font-heading_font font-bold">{query}</span>
          {data.word in words ? (
            <button type="button" onClick={() => handleDelete(data.word)}>
              <HiDocumentRemove className="text-2xl text-primary-900" />
            </button>
          ) : (
            <button type="button" onClick={() => handleSave(data)}>
              <HiDocumentAdd className="text-2xl text-primary-900" />
            </button>
          )}
        </div>
        <div className="flex items-center mb-4">
          <p className="text-neutral-600">{data.phonetic}</p>
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
        </div>

        {data.meanings.map((meaning: Meaning, index: number) => {
          return (
            <div key={meaning.partOfSpeech}>
              <p className="text-primary-900 font-bold text-lg mb-1">
                {meaning.partOfSpeech[0].toUpperCase() +
                  meaning.partOfSpeech.substr(1)}
              </p>
              {meaning.definitions.map((definition: Definition, i: number) => {
                return (
                  <div key={definition.definition} className="mb-2">
                    <div className="flex">
                      <p className="mr-2">{i + 1}.</p>
                      <p>{definition.definition}</p>
                    </div>
                    {definition.example && (
                      <p className="ml-3 text-neutral-600">
                        - {definition.example}
                      </p>
                    )}
                  </div>
                );
              })}
              <div>
                {meaning.synonyms.length !== 0 && (
                  <div>
                    <p className="font-heading_font text-lg mb-1">Synonyms</p>
                    <div className="flex flex-wrap text-neutral-700">
                      {meaning.synonyms.map((synonym) => {
                        const url = `/search/${synonym}`;
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
                    <div className="flex flex-wrap text-neutral-700">
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

              {data.meanings.length - 1 !== index && (
                <hr className="border-primary-700 opacity-40 my-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
