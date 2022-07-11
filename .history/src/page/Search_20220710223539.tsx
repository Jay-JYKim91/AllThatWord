import SearchBar from 'component/SearchBar';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { MdOutlineError } from 'react-icons/md';
import { GiSpeaker } from 'react-icons/gi';
import { searchByQuery } from '../services/dictionaryAPI';

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

// type Result = {
//   meanings: Meaning[];
//   phonetic: string;
//   phonetics: [];
// };

const Search: React.FC = () => {
  const { query } = useParams();

  const { isLoading, isError, data, refetch } = useQuery(
    'searchByQuery',
    () => searchByQuery(query! as string),
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
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
            {/* <p>Loading...</p> */}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    // console.log((error! as AxiosError).response?.status);
    return (
      <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
        <SearchBar />
        <div className="py-20 font-heading_font text-center">
          <MdOutlineError className="text-6xl text-primary-900 m-auto" />
          <p className="mt-4 text-xl font-body1_font">
            No results found for &apos;{query}&apos;
            <br />
            Please try another keywords.
          </p>
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8">
      <SearchBar />
      <div className="py-4">
        <h1 className="text-4xl font-heading_font font-bold">{query}</h1>
        <div className="flex items-center mb-4">
          <p className="text-neutral-600">{data.phonetic}</p>
          <button type="button" className="ml-2">
            <GiSpeaker className="text-3xl" />
          </button>
        </div>

        {data.meanings.map((meaning: Meaning, index: number) => {
          return (
            <div key={meaning.partOfSpeech}>
              <p className="text-primary-900 font-bold mb-1">
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
                    {/* {definition.synonyms &&
                      definition.synonyms.map((synonym: string) => {
                        return <span key={synonym}>{synonym}</span>;
                      })}
                    {definition.antonyms &&
                      definition.antonyms.map((antonym: string) => {
                        return <span key={antonym}>{antonym}, </span>;
                      })} */}
                  </div>
                );
              })}
              <div>
                {meaning.synonyms && (
                  <div>
                    <p>Synonyms</p>
                    {meaning.synonyms.map((synonym) => {
                      return <span>{synonym}, </span>;
                    })}
                  </div>
                )}
                {meaning.antonyms && (
                  <div>
                    <p>Antonyms</p>
                    {meaning.antonyms.map((antonym) => {
                      return <span>{antonym}, </span>;
                    })}
                  </div>
                )}
              </div>

              {data.meanings.length - 1 !== index && (
                <hr className="border-primary-500 my-4" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
