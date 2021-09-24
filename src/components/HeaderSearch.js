import React, { useEffect } from 'react';
import { fetchForFirstLetter } from '../service/GetAPI';

function Header() {
  const fetchTest = (letter) => {
    fetchForFirstLetter(letter);
  };

  useEffect(() => {
    const letter = 'a';
    fetchTest(letter);
  }, []);

  return (
    <div>
      <input
        type="text"
      />
      <input
        type="radio"
        value="ingrediente"
        name="select-search"
        data-testid="ingredient-search-radio"
      />
      ingrediente
      <input
        type="radio"
        value="nome"
        name="select-search"
        data-testid="name-search-radio"
      />
      nome
      <input
        type="radio"
        value="primeira letra"
        name="select-search"
        data-testid="first-letter-search-radio"
      />
      primeira letra
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default Header;
