import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../contexts/appContext';
import { fetchByIngredient, fetchByName, fetchByLetter } from '../services/fetchs';

const SearchBar = () => {
  const { state, setState } = useContext(appContext);

  const [searchText, setSearchText] = useState('');
  const [option, setOption] = useState('ingredient');
  const history = useHistory();

  useEffect(() => {
    // redirect to details case the search to be equal one meal or drink
    const { foods, drinks } = state;
    if (foods.length === 1) {
      history.push(`/comidas/${foods[0].idMeal}`);
    } else if (drinks.length === 1) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [state, history]);

  const switchDrinks = async (type) => {
    switch (option) {
    case 'ingredient':
      setState({
        ...state,
        drinks: await fetchByIngredient(type, searchText),
        key: true });
      break;
    case 'name':
      setState({
        ...state,
        drinks: await fetchByName(type, searchText),
        key: true });
      break;
    case 'first-letter':
      if (searchText.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        setState({
          ...state,
          drinks: await fetchByLetter(type, searchText),
          key: true });
      }
      break;
    default:
      break;
    }
  };

  const switchMeals = async (type) => {
    switch (option) {
    case 'ingredient':
      setState(await {
        ...state,
        foods: await fetchByIngredient(type, searchText),
        key: true });
      break;
    case 'name':
      setState({
        ...state,
        foods: await fetchByName(type, searchText),
        key: true });
      break;
    case 'first-letter':
      if (searchText.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        setState({
          ...state,
          foods: await fetchByLetter(type, searchText),
          key: true });
      }
      break;
    default:
      break;
    }
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (history.location.pathname === '/comidas') {
      await switchMeals('themealdb');
    } else {
      await switchDrinks('thecocktaildb');
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
        type="submit"
        data-testid="exec-search-btn"
        onClick={ (e) => onSearch(e) }
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
