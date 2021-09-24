import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';
import ComponentList from '../components/ComponentList';
import ComponentLoading from '../components/ComponentLoading';

function Comidas() {
  const currentContext = useContext(recipeContext).ContextComidas;
  const {
    showInput, dataForFetch, handleCurrentPage, currentID, loading } = currentContext;
  const { redirectState } = dataForFetch;

  useEffect(handleCurrentPage, []);

  return (
    <div>
      <Header title="Comidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      {loading ? <ComponentLoading /> : <ComponentList />}
      {redirectState && <Redirect to={ `/comidas/${currentID}` } /> }
      <ComponentFooter />
    </div>
  );
}

export default Comidas;
