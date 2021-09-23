import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  fetchMealIngredient,
  fetchMealName,
  fetchMealFirstLetter,
} from '../services/mealAPI';

import {
  fetchCocktailIngredient,
  fetchCocktailName,
  fetchCocktailFirstLetter,
} from '../services/cocktailAPI';

const SearchBar = () => {
  const [input, setInput] = useState({
    inputText: '',
  });

  const inputChange = ({ target: { id, value } }) => {
    setInput({ ...input, [id]: value });
  };

  const location = useLocation().pathname;

  const verifyRadioValue = (value) => {
    const { inputText } = input;

    switch (location) {
    case '/comidas':
      if (value === 'ingredient') {
        fetchMealIngredient(inputText);
      } else if (value === 'name') {
        fetchMealName(inputText);
      } else if (value === 'first-letter') {
        if (inputText.length >= 2) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        }
        fetchMealFirstLetter(inputText);
      }
      break;

    case '/bebidas':
      if (value === 'ingredient') {
        fetchCocktailIngredient(inputText);
      } else if (value === 'name') {
        fetchCocktailName(inputText);
      } else if (value === 'first-letter') {
        if (inputText.length >= 2) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        }
        fetchCocktailFirstLetter(inputText);
      }
      break;

    default: return null;
    }
  };
  const onChangeValue = (event) => (verifyRadioValue(event.target.value));

  const { inputText } = input;
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        data-testid="search-input"
        id="inputText"
        value={ inputText }
        onChange={ inputChange }
      />

      <div>
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            id="ingredient-search"
            name="button"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ onChangeValue }
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
            onClick={ onChangeValue }
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
            onClick={ onChangeValue }
          />
          Primeira letra
        </label>
      </div>
    </div>
  );
};

// Guia para verificar radio button selecionado.
// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs

export default SearchBar;
