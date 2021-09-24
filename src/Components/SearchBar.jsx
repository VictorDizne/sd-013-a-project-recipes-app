import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Context from '../ContextAPI/Context';
import RecipeCard from './RecipeCard';

// import {
//   fetchIngredient,
//   fetchName,
//   fetchFirstLetter,
// } from '../services/fetchAPI';

const SearchBar = () => {
  const [input, setInput] = useState({
    inputText: '',
  });

  const inputChange = ({ target: { id, value } }) => {
    setInput({ ...input, [id]: value });
  };

  const { fetchIngredient,
    fetchName,
    fetchFirstLetter,
    data,
  } = useContext(Context);

  const { pathname } = useLocation();

  const pathnameCheck = () => {
    switch (pathname) {
    case '/comidas':
      return 'themealdb';
    case '/bebidas':
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const verifyRadioValue = (value) => {
    const { inputText } = input;
    if (value === 'ingredient') {
      fetchIngredient(pathnameCheck(), inputText);
    } else if (value === 'name') {
      fetchName(pathnameCheck(), inputText);
    } else if (value === 'first-letter') {
      if (inputText.length >= 2) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      fetchFirstLetter(pathnameCheck(), inputText);
    }
  };

  const onMouseClick = (event) => (verifyRadioValue(event.target.value));

  const DOZE = 12;

  const { inputText } = input;
  return (
    <div>

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
              onClick={ onMouseClick }
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
              onClick={ onMouseClick }
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
              onClick={ onMouseClick }
            />
            Primeira letra
          </label>
        </div>
      </div>
      {data.map((recipe, index) => (
        index < DOZE && <RecipeCard
          name={ recipe.strDrink || recipe.strMeal }
          img={ recipe.strDrinkThumb || recipe.strMealThumb }
          key={ index }
        />
      ))}
    </div>

  );
};

// Guia para verificar radio button selecionado.
// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs

export default SearchBar;
