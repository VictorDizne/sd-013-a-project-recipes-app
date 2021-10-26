import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RedirectComponent from './RedirectComponent';
import FilterResults from './FilterResults';
import appContext from '../redux/appcontext';

const Searchbar = ({ bebidas }) => {
  const [ingredient, switchIngredient] = useState(false);
  const [name, switchName] = useState(false);
  const [firstLetter, switchFirstLetter] = useState(false);
  const [fetchResult, updateFetch] = useState(false);
  const [filterInput, handleFilterChange] = useState('');
  const { toggleSearchbarFilter } = useContext(appContext);

  let ingredientSearchApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filterInput}`;
  let nameSearchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${filterInput}`;
  let firstLetterSearchApi = `https://www.themealdb.com/api/json/v1/1/search.php?f=${filterInput}`;

  if (bebidas) {
    ingredientSearchApi = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filterInput}`;
    nameSearchApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filterInput}`;
    firstLetterSearchApi = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${filterInput}`;
  }

  function handleIngredientChange() {
    switchIngredient(true);
    switchName(false);
    switchFirstLetter(false);
  }

  function handleNameChange() {
    switchIngredient(false);
    switchName(true);
    switchFirstLetter(false);
  }

  function handleFirstLetterChange() {
    switchIngredient(false);
    switchName(false);
    switchFirstLetter(true);
  }

  async function handleClick() {
    toggleSearchbarFilter(true);
    if (ingredient) {
      const fet = await fetch(ingredientSearchApi)
        .then((r) => r.json());
      updateFetch(fet);
    }
    if (name) {
      const fet = await fetch(nameSearchApi)
        .then((r) => r.json());
      updateFetch(fet);
    }
    if (firstLetter && filterInput.length === 1) {
      const fet = await fetch(firstLetterSearchApi)
        .then((r) => r.json());
      updateFetch(fet);
    }
    if (firstLetter && filterInput.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  return (
    <div className="searchbar-container">
      <label className="teste" htmlFor="search-input">
        <input
          data-testid="search-input"
          type="text"
          placeholder="Insira o termo de busca"
          value={ filterInput }
          onChange={ (e) => handleFilterChange(e.target.value) }
        />
      </label>
      <label className="form-check" htmlFor="ingredient-search-radio">
        <span className="form-check-label">Ingrediente</span>
        <input
          className="form-check-input"
          data-testid="ingredient-search-radio"
          type="radio"
          name="filter-search"
          value="ingredient"
          onClick={ handleIngredientChange }
        />
      </label>
      <label className="form-check" htmlFor="name-search-radio">
        <span className="form-check-label">Nome</span>
        <input
          data-testid="name-search-radio"
          className="form-check-input"
          type="radio"
          name="filter-search"
          value="name"
          onClick={ handleNameChange }
        />
      </label>
      <label className="form-check" htmlFor="first-letter-search-radio">
        <span className="form-check-label">Primeira Letra</span>
        <input
          className="form-check-input"
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter-search"
          value="first-letter"
          onClick={ handleFirstLetterChange }
        />
      </label>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="exec-search-btn"
      >
        Fazer busca
      </button>
      <br />
      <RedirectComponent fetchResult={ fetchResult } />
      <FilterResults fetchResult={ fetchResult } />
    </div>
  );
};

Searchbar.propTypes = {
  bebidas: PropTypes.bool.isRequired,
};

export default Searchbar;
