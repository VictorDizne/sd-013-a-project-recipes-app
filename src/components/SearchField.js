import React from 'react';

function SearchField() {
  return (
    <div style={ { display: 'flex', flexFlow: 'column' } }>
      <input
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          id="ingredient"
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input id="name" type="radio" name="search" data-testid="name-search-radio" />
      </label>
      <label htmlFor="first-letter">
        Primeira letra:
        <input
          id="first-letter"
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default SearchField;
