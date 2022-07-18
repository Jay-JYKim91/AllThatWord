import SearchBar from 'component/SearchBar';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8 text-center dark:bg-primary-900">
      <h1 className="text-primary-900 text-4xl font-heading_font py-10">
        AllThatWord
      </h1>
      <SearchBar imageURL="./search.png" />
    </div>
  );
};

export default Home;
