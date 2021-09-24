import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import MyContext from '../context/Context';
import * as myFunc from '../services/api';

function SearchField() {
  const [redirect, setRedirect] = useState(false);
  const [page, setPage] = useState('');
  const [idType, setIdType] = useState();
  const {
    searchInput,
    setSearchInput,
    setRadioInput,
    setRecipes,
    recipes,
    radioInput,
    myPage,
  } = useContext(MyContext);

  async function handleFetchClick() {
    if (myPage === 'themealdb') {
      const { meals } = await myFunc.fetchSearchApi(searchInput, radioInput, myPage);
      setPage('comidas');
      setRecipes(meals);
      if (!meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setIdType('idMeal');
        return meals.length === 1 ? setRedirect(true) : setRedirect(false);
      }
    } else {
      const { drinks } = await myFunc.fetchSearchApi(searchInput, radioInput, myPage);
      setPage('bebidas');
      setRecipes(drinks);
      if (!drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        setIdType('idDrink');
        return drinks.length === 1 ? setRedirect(true) : setRedirect(false);
      }
    }
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
      { redirect && <Redirect to={ `/${page}/${recipes[0][idType]}` } /> }
    </div>
  );
}

export default SearchField;
