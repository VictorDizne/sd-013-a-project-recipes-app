import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/index';
import '../styles/HeaderSearchBar.css';

function HeaderSearchBar({ page, handleClickSearchBar }) {
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

    handleClickSearchBar();
  }

  return (
    <form className="form_bar">
      <input
        type="text"
        placeholder="Buscar receitas"
        className="input_pesquisa"
        data-testid="search-input"
        value={ inputText }
        onChange={ (event) => setInputText(event.target.value) }
      />

      <div className="radio-container">
        <label htmlFor="ingredient" className="label">
          <input
            type="radio"
            name="search-type"
            className="radio-button"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ (event) => setInputRadio(event.target.value) }
          />
          Ingrediente
        </label>

        <label htmlFor="name" className="label">
          <input
            type="radio"
            name="search-type"
            className="radio-button"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ (event) => setInputRadio(event.target.value) }
          />
          Nome
        </label>

        <label htmlFor="letter" className="label">
          <input
            type="radio"
            name="search-type"
            className="radio-button"
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
  page: PropTypes.string,
  handleClickSearchBar: PropTypes.func,
}.isRequired;

export default HeaderSearchBar;
