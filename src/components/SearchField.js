import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';
import api from '../services/api';

function SearchField() {
  const [redirect, setRedirect] = useState(false);
  const [page, setPage] = useState('');
  const [idType, setIdType] = useState();
  const {
    searchInput,
    setSearchInput,
    setRadioInput,
    setRecipe,
    recipe,
    radioInput,
    myPage,
  } = useContext(MyContext);

  async function handleFetchClick() {
    if (myPage === 'themealdb') {
      const { meals } = await api(searchInput, radioInput, myPage);
      setPage('comidas');
      setRecipe(meals);
      setIdType('idMeal');
      return meals.length === 1 ? setRedirect(true) : setRedirect(false);
    }
    const { drinks } = await api(searchInput, radioInput, myPage);
    setPage('bebidas');
    setRecipe(drinks);
    setIdType('idDrink');
    return drinks.length === 1 ? setRedirect(true) : setRedirect(false);
  }
  return (
    <div style={ { display: 'flex', flexFlow: 'column' } }>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          id="ingredient"
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setRadioInput(target.value) }
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          id="name"
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target }) => setRadioInput(target.value) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra:
        <input
          id="first-letter"
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ ({ target }) => setRadioInput(target.value) }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleFetchClick }
        type="button"
      >
        Buscar
      </button>
      { redirect && <Redirect to={ `/${page}/${recipe[0][idType]}` } /> }
    </div>
  );
}

export default SearchField;
