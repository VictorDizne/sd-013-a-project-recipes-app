import React, { useRef, useEffect, useContext } from 'react';
import { useDebugState } from 'use-named-state';
import recipeContext from '../context';

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
    <div>
      <input
        type="text"
        id="search"
        data-testid="search-input"
        placeholder="Buscar Receita"
        value={ componentState.searchState }
        onChange={ handleChange }
      />
      <label htmlFor="i">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          id="i"
          name="radio"
          type="radio"
          onClick={ handleChange }
          value="filter"
        />
      </label>
      <label htmlFor="s">
        Nome
        <input
          data-testid="name-search-radio"
          id="s"
          name="radio"
          type="radio"
          onClick={ handleChange }
          value="search"
        />
      </label>
      <label htmlFor="f">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          id="f"
          name="radio"
          type="radio"
          onClick={ handleChange }
          value="search"
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ clickOrAlert }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchInput;
