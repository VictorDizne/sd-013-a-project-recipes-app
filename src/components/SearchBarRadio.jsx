import React from 'react';

const SearchBarRadio = () => (
  <div>
    <label htmlFor="filter_radio">
      Ingrediente
      <input
        type="radio"
        name=""
        id=""
        data-testid="ingredient-search-radio"
      />
    </label>

    <label htmlFor="teste">
      Nome
      <input
        type="radio"
        name=""
        id="teste"
        data-testid="name-search-radio"
      />
    </label>

    <label htmlFor="teste">
      Primeira Letra
      <input
        type="radio"
        name=""
        id="teste"
        data-testid="first-letter-search-radio"
      />
    </label>

    <button
      type="button"
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
  </div>
);

export default SearchBarRadio;
