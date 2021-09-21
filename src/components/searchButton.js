import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

export default function SearchButton() {
  const [bool, setBool] = useState(false);

  return (
    <>
      <div>
        <button
          type="button"
          className="btn-search"
          onClick={ () => setBool(!bool) }
        >
          <img src={ searchIcon } alt="ícone de perfil" data-testid="search-top-btn" />
        </button>
      </div>

      {bool && <input type="text" data-testid="search-input" />}
    </>
  );
}
