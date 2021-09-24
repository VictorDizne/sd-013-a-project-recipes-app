import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';
import ComponentList from '../components/ComponentList';
import ComponentLoading from '../components/ComponentLoading';

function Bebidas() {
  const currentContext = useContext(recipeContext).ContextBebidas;
  const {
    showInput, dataForFetch, handleCurrentPage, currentID, loading } = currentContext;
  const { redirectState } = dataForFetch;

  useEffect(handleCurrentPage, []);

  return (
    <div>
      <Header title="Bebidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      {loading ? <ComponentLoading /> : <ComponentList />}
      {redirectState && <Redirect to={ `/bebidas/${currentID}` } /> }
      <ComponentFooter />
    </div>
  );
}

export default Bebidas;
