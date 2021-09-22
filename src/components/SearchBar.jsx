import React, { useState } from 'react';

// import { useHistory } from "react-router";

const SearchBar = () => {
  // const history = useHistory();
  const [state, setState] = useState({
    search: '',
    searchCategory: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <input
          placeholder="Busque por uma receita"
          onChange={ handleChange }
          value={ state.search }
          name="search"
          data-testid="search-input"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="ingredient-search">
          <input
            onChange={ handleChange }
            value="ingredient"
            name="searchCategory"
            id="ingredient-search"
            data-testid="ingredient-search-radio"
            type="radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search">
          <input
            onChange={ handleChange }
            value="name"
            name="searchCategory"
            id="name-search"
            data-testid="name-search-radio"
            type="radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-search">
          <input
            onChange={ handleChange }
            value="firstLetter"
            name="searchCategory"
            id="first-letter-search"
            data-testid="first-letter-search-radio"
            type="radio"
          />
          Primeira letra
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
};

export default SearchBar;
