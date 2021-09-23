import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../contexts/appContext';
import { fetchByIngredient, fetchByName, fetchByLetter } from '../services/fetchs';

const SearchBar = () => {
  const { state, setState } = useContext(appContext);

  const [searchText, setSearchText] = useState('');
  const [option, setOption] = useState('ingredient');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const history = useHistory();

  const switchOptions = async (type) => {
    if (type === 'themealdb') {
      switch (option) {
      case 'ingredient':
        setMeals(await fetchByIngredient(type, searchText));
        setState({ ...state, foods: [...meals] });
        break;
      case 'name':
        setMeals(await fetchByName(type, searchText));
        setState({ ...state, foods: [...meals] });
        break;
      case 'first-letter':
        if (searchText.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setMeals(await fetchByLetter(type, searchText));
          setState({ ...state, foods: [...meals] });
        }
        break;
      default:
        break;
      }
    } else {
      switch (option) {
      case 'ingredient':
        setDrinks(await fetchByIngredient(type, searchText));
        setState({ ...state, drinks: [...drinks] });
        break;
      case 'name':
        setDrinks(await fetchByName(type, searchText));
        setState({ ...state, drinks: [...drinks] });
        break;
      case 'first-letter':
        if (searchText.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          setDrinks(await fetchByLetter(type, searchText));
          setState({ ...state, drinks: [...drinks] });
        }
        break;
      default:
        break;
      }
    }
  };

  const onSearch = async () => {
    if (history.location.pathname === '/comidas') {
      switchOptions('themealdb');
    } else {
      switchOptions('thecocktaildb');
    }
    if (meals.length === 1) {
      history.push(`/comidas/${meals[0].idMeal}`);
    } else if (drinks.length === 1) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  };

  return (
    <form>
      <label htmlFor="search-text">
        <input
          id="search-text"
          type="text"
          data-testid="search-input"
          placeHolder="Buscar Receita"
          onChange={ (e) => setSearchText(e.target.value) }
        />
      </label>
      <label htmlFor="search-ingredient">
        Ingrediente
        <input
          id="search-ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          name="search-type"
          value="ingredient"
          onClick={ (e) => setOption(e.target.value) }
        />
      </label>
      <label htmlFor="search-name">
        Nome
        <input
          id="search-name"
          type="radio"
          data-testid="name-search-radio"
          name="search-type"
          value="name"
          onClick={ (e) => setOption(e.target.value) }
        />
      </label>
      <label htmlFor="search-first-letter">
        Primeira Letra
        <input
          id="search-first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          name="search-type"
          value="first-letter"
          onClick={ (e) => setOption(e.target.value) }
        />
      </label>
      <button
        id="button-login"
        type="button"
        data-testid="exec-search-btn"
        onClick={ onSearch }
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
