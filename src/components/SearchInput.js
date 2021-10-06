import React, { useRef, useEffect, useContext } from 'react';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';
import './Styles/SearchInput.css';
import searchIcon from '../images/searchIcon.svg';

function SearchInput() {
  const currentContext = useContext(recipeContext).ContextHeader;
  const { handleDataForFetch, finallyFetch } = currentContext;

  const invalidRequestState = useRef(true);
  const INITIAL = { buttonState: '', searchState: '', letter: '' };

  const [componentState, setComponentState] = useDebugState('componentState', INITIAL);

  const handleChange = ({ target: { value, id } }) => {
    if (id === 'search') {
      setComponentState({ ...componentState, searchState: value });
    } else {
      setComponentState({ ...componentState, buttonState: value, letter: id });
    }
  };

  useEffect(() => {
    if (!invalidRequestState.current) {
      handleDataForFetch(componentState);
    } else {
      invalidRequestState.current = false;
    }
  }, [componentState]);

  const clickOrAlert = () => {
    const { searchState, letter } = componentState;
    if ((letter === 'f') && (searchState.length > 1)) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      finallyFetch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          id="search"
          className="search-input"
          data-testid="search-input"
          placeholder="Buscar Receita"
          value={ componentState.searchState }
          onChange={ handleChange }
        />
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ clickOrAlert }
          className="btn-search-bar"
        >
          <img src={ searchIcon } alt="" width="20px" />
        </button>
      </div>
      <div className="search-options">
        <label htmlFor="i" className="search-inputs-options">
          <input
            data-testid="ingredient-search-radio"
            id="i"
            name="radio"
            type="radio"
            onClick={ handleChange }
            value="filter"
          />
          Ingrediente
        </label>
        <label htmlFor="s" className="search-inputs-options">
          <input
            data-testid="name-search-radio"
            id="s"
            name="radio"
            type="radio"
            onClick={ handleChange }
            value="search"
          />
          Nome
        </label>
        <label htmlFor="f" className="search-inputs-options">
          <input
            data-testid="first-letter-search-radio"
            id="f"
            name="radio"
            type="radio"
            onClick={ handleChange }
            value="search"
          />
          Primeira letra
        </label>
      </div>
    </div>
  );
}

export default SearchInput;
