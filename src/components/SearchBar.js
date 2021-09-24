import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

const SearchBar = ({ isMeal }) => {
  const [input, setInput] = useState('');
  const [radio, setRadio] = useState('');
  const { handleBtnClick } = useContext(RecipesContext);

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
        onClick={ () => handleBtnClick({ input, isMeal, radio }) }
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
