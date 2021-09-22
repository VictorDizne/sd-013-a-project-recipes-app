import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

const Foods = () => {
  const enable = useSelector(({ functionsReducer }) => functionsReducer.enableSearch);
  return (
    <div>
      <h1>Foods</h1>
      {enable && <SearchBar />}
      <Footer />
    </div>
  );
};

export default Foods;
