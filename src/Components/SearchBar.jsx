import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Buscar" data-testid="search-input" />

      <label htmlFor="ingredient-search">
        <input
          type="radio"
          id="ingredient-search"
          name="button"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>

      <label htmlFor="name-search">
        <input
          type="radio"
          id="name-search"
          name="button"
          value="name"
          data-testid="name-search-radio"
        />
        Nome
      </label>

      <label htmlFor="first-letter-search">
        <input
          type="radio"
          id="first-letter-search"
          name="button"
          value="first-letter"
          data-testid="first-letter-search-radio" 
        />
        Primeira letra
      </label>

    </div>
  )
}

export default SearchBar;
