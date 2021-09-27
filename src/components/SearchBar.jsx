import React, { useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Input } from '.';

function SearchBar({ setSearchBarStatus, setFoodRecipes }) {
  const [textInput, setTextInput] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [loneFood, setLoneFood] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ target: { name, value } }) => (
    name === 'textInput' ? setTextInput(value) : setRadioButton(value)
  );

  const searchBarAlert = () => (
    radioButton === 'firstLetter' && textInput.length > 1
      ? global.alert('Sua busca deve conter somente 1 (um) caracter')
      : global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
  );

  const handleEndPoints = () => {
    switch (radioButton) {
    case 'ingredient':
      return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${textInput}`;
    case 'name':
      return `https://www.themealdb.com/api/json/v1/1/search.php?s=${textInput}`;
    case 'searchInput':
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${textInput}`;
    default:
      break;
    }
  };

  const getFoodRecipes = async () => {
    const ENDPOINT = handleEndPoints();
    const RETURN_LENGTH = 12;
    const response = await (await fetch(ENDPOINT)).json();

    if (!response.meals) return searchBarAlert();

    if (response.meals.length === 1) {
      setLoneFood(response.meal.idMeal);
      setRedirect(true);
    } else {
      setFoodRecipes(response.meals.slice(0, RETURN_LENGTH));
    }

    setSearchBarStatus(false);
  };

  return (
    <section>
      {
        redirect && <Redirect to={ `/comidas/${loneFood}` } />
      }
      <form onSubmit={ getFoodRecipes }>
        <Input
          type="text"
          id="search-input"
          className="searchInput"
          name="textInput"
          value={ textInput }
          placeHolder="Buscar receita"
          onChange={ handleChange }
        />
        <Input
          labelText="Ingrediente"
          type="radio"
          id="name-search-radio"
          className="searchRadio"
          name="ingredient"
          value="ingredient"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Input
          labelText="Nome"
          type="radio"
          id="name-search-radio"
          className="searchRadio"
          name="name"
          value="name"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Input
          labelText="Primeira Letra"
          type="radio"
          id="name-search-radio"
          className="searchRadio"
          name="firstLetter"
          value="firstLetter"
          onChange={ handleChange }
          searchQuery={ radioButton }
        />
        <Button
          type="sumbit"
          id="exec-search-btn"
          className="searchBarButton"
        />
      </form>
    </section>
  );
}

const { func } = PropTypes;

SearchBar.propTypes = {
  setSearchBarStatus: func,
  setFoodRecipes: func,
}.isRequired;

export default SearchBar;
