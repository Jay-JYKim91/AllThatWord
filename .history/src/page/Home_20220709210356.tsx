import SearchBar from 'component/SearchBar';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="px-6 md:px-9 lg:px-12 py-4 md:py-6 lg:py-8 text-center">
      <h1 className="text-primary-900 text-4xl font-heading_font">
        AllThatWord
      </h1>
      <SearchBar />
    </div>
  );
};

export default Home;
