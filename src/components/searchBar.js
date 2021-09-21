import React from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function SearchBar() {
  return (
    <button
      type="button"
      data-testid="search-top-btn"
      className="btn-search"
    >
      <img src={ searchIcon } alt="ícone de perfil" />
    </button>

  );
}
