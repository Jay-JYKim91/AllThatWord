import React from 'react';

const Flashcard: React.FC = () => {
  return (
    <div
      className={`card ${divStyle}`}
      role="button"
      tabIndex={index}
      key={word.id}
      onClick={(event) => {
        findParentElement(event).classList.toggle('is-flipped');
      }}
    >
      <div
        className="card__face card__face--front mb-2 rounded w-full h-full flex flex-col justify-center align-middle"
        key={word.id}
      >
        <p className="font-heading_font text-2xl text-center lg:text-4xl">
          {word.id}
        </p>
        <div className="flex items-center justify-center">
          <p className="text-neutral-600 text-md">{word.phonetic}</p>
        </div>
      </div>
      <div className="card__face card__face--back flex flex-col align-middle md:justify-center overflow-y-scroll">
        {word.meanings.map((meaning) => {
          return (
            <div key={meaning.partOfSpeech}>
              <p className="text-primary-900 font-bold text-left text-sm lg:text-base">
                {meaning.partOfSpeech.toUpperCase()}
              </p>
              <p className="text-left mb-4 lg:text-lg">
                {meaning.definitions[0].definition}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flashcard;
