import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/index';
import '../styles/Header.css';

function HeaderSearchBar({ page }) {
  const {
    inputText,
    setInputText,
    setInputRadio,
    handleMealsApis,
    handleDrinksApis,
  } = useContext(RecipesContext);

  function handleClick() {
    if (page === 'foods') {
      handleMealsApis();
    }

    if (page === 'drinks') {
      handleDrinksApis();
    }
  }

  return (
    <form className="fome_bar">
      <input
        type="text"
        placeholder="Buscar receitas"
        className="input_pesquisa"
        data-testid="search-input"
        value={ inputText }
        onChange={ (event) => setInputText(event.target.value) }
      />
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search-type"
            className="radio_1"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (event) => setInputRadio(event.target.value) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search-type"
            className="radio_2"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ (event) => setInputRadio(event.target.value) }
          />
          Nome
        </label>
        <label htmlFor="letter">
          <input
            type="radio"
            name="search-type"
            className="radio_3"
            id="letter"
            data-testid="first-letter-search-radio"
            value="letter"
            onChange={ (event) => setInputRadio(event.target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="button_pesquisa"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </form>
  );
}

HeaderSearchBar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default HeaderSearchBar;
