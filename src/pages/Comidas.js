import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';
import ComponentList from '../components/ComponentList';

function Comidas() {
  const currentContext = useContext(recipeContext).ContextComidas;
  const { showInput, dataForFetch, handleCurrentPage, currentID } = currentContext;
  const { redirectState } = dataForFetch;

  useEffect(handleCurrentPage, []);

  return (
    <div>
      <Header title="Comidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      <ComponentList />
      <ComponentFooter />
      {redirectState && <Redirect to={ `/comidas/${currentID}` } /> }
    </div>
  );
}

export default Comidas;
