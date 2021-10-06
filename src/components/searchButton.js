import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './searchBar';

export default function SearchButton() {
  const [bool, setBool] = useState(false);

  return (
    <>
      <div className="d-flex align-content-start flex-wrap">
        <button
          type="button"
          className="btn-search"
          onClick={ () => setBool(!bool) }
        >
          <img src={ searchIcon } alt="ícone de busca" data-testid="search-top-btn" />
        </button>
      </div>

      {bool && <SearchBar />}
    </>
  );
}
