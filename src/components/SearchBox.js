import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { MainContext } from '../context/Provider';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const location = useLocation();
  const { setSearchSettings } = useContext(MainContext);

  const handleClick = (event) => {
    event.preventDefault();
    if (type === 'firstLetter' && query.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      setSearchSettings({ query, type, path: location.pathname });
    }
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          type="text"
          name="search-input"
          data-testid="search-input"
          placeholder="Buscar receita"
          onChange={ ({ target }) => setQuery(target.value) }
        />
      </label>
      <label htmlFor="search-type">
        Ingrediente
        <input
          value="ingredient"
          type="radio"
          name="search-type"
          data-testid="ingredient-search-radio"
          onChange={ ({ target }) => setType(target.value) }
        />
      </label>
      <label htmlFor="search-type">
        Nome
        <input
          value="name"
          type="radio"
          name="search-type"
          data-testid="name-search-radio"
          onChange={ ({ target }) => setType(target.value) }
        />
      </label>
      <label htmlFor="search-type">
        Primeira letra
        <input
          value="firstLetter"
          type="radio"
          name="search-type"
          data-testid="first-letter-search-radio"
          onChange={ ({ target }) => setType(target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="submit"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBox;
