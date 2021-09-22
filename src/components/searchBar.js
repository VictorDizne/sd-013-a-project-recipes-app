import React, { useState, useContext } from 'react';
import appContext from '../contexts/appContext';
import { fetchByIngredient, fetchByName, fetchByLetter } from '../services/fetchs';

export default function SearchBar(props) {
  const { state, setState } = useContext(appContext);

  const [searchText, setSearchText] = useState('');
  const [option, setOption] = useState('ingredient');

  const onSearch = async () => {
    if (props.history.location === '/comidas') {
      let foods;
      switch (option) {
      case 'ingredient':
        foods = await fetchByIngredient(searchText);
        setState({ ...state, foods: [...foods] });
        break;
      case 'name':
        foods = await fetchByName(searchText);
        setState({ ...state, foods: [...foods] });
        break;
      case 'first-letter':
        if (searchText.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          foods = await fetchByLetter(searchText);
          setState({ ...state, foods: [...foods] });
        }
        break;
      default:
        break;
      }
    } else if (props.history.location === '/bebidas') {
      let drinks;
      switch (option) {
      case 'ingredient':
        drinks = await fetchByIngredient('thecocktaildb', searchText);
        setState({ ...state, drinks: [...drinks] });
        break;
      case 'name':
        drinks = await fetchByName('thecocktaildb', searchText);
        setState({ ...state, drinks: [...drinks] });
        break;
      case 'first-letter':
        if (searchText.length > 1) {
          global.alert('Sua busca deve conter somente 1 (um) caracter');
        } else {
          drinks = await fetchByLetter('thecocktaildb', searchText);
          setState({ ...state, drinks: [...drinks] });
        }
        break;
      default:
        break;
      }
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
}
