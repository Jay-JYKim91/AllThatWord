import React from 'react';

type Prop = {
  word: Word;
};
const Word: React.FC<Prop> = ({ word }) => {
  return (
    <div className="py-2 px-3 bg-neutral-200 mb-2 rounded" key={word.id}>
      <div className="flex items-center justify-between">
        <p className="font-heading_font text-2xl">{word.id}</p>
        <button type="button" onClick={() => handleDelete(word.id)}>
          <RiDeleteBin5Fill className="text-2xl text-primary-900" />
        </button>
      </div>
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
      {word.meanings.map((meaning, index) => {
        const marginBottom = index === word.meanings.length - 1 ? '' : 'mb-1';
        return (
          <div key={meaning.partOfSpeech}>
            <p className="text-primary-900 font-bold mr-2 min-w-[105px]">
              {meaning.partOfSpeech.toUpperCase()}
            </p>
            <p className={marginBottom}>{meaning.definitions[0].definition}</p>
          </div>
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
