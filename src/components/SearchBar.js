import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const SearchBar = ({ isMeal }) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');
  const { setDrinks, setMeals } = useContext(RecipesContext);

  const handleBtnClick = () => {
    console.log(isMeal);
    const radioIdsObj = {
      Ingrediente: isMeal ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
      Nome: isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
      'Primeira Letra': isMeal ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
    };

    if (radio === 'Primeira Letra' && input.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }

    if (isMeal) {
      console.log('tamo aqui hein');
      fetch(radioIdsObj[radio])
        .then((res) => res.json())
        .then((json) => {
          setMeals(json.meals);
          return json.meals;
        });
    } else {
      console.log('tamo aqui nao');
      fetch(radioIdsObj[radio])
        .then((res) => res.json())
        .then((json) => {
          setDrinks(json.drinks);
          return json.drinks;
        });
    }
  };

  return (
    <div className="search-bar">
      <input
        value={ input }
        onChange={ ({ target }) => setInput(target.value) }
        type="text"
        data-testid="search-input"
      />
      <div onChange={ ({ target }) => setRadio(target.value) }>
        <input
          id="ingredientSearch"
          type="radio"
          name="search-radio"
          data-testid="ingredient-search-radio"
          value="Ingrediente"
        />
        Ingrediente
        <input
          id="nameSearch"
          type="radio"
          name="search-radio"
          data-testid="name-search-radio"
          value="Nome"
        />
        Nome
        <input
          id="firstLetterSearch"
          type="radio"
          data-name="letter"
          name="search-radio"
          data-testid="first-letter-search-radio"
          value="Primeira Letra"
        />
        Primeira Letra
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleBtnClick }
      >
        Buscar
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default SearchBar;
