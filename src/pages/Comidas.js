import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import recipeContext from '../context';
import SearchInput from '../components/SearchInput';
import ComponentFooter from '../components/ComponentFooter';
import ComponentList from '../components/ComponentList';
import ComponentLoading from '../components/ComponentLoading';
import ComponentCategory from '../components/ComponentCategory';
import './Styles/RecipeList.css';
import useQuery from '../hooks/useQuery';

function Comidas() {
  const params = useQuery();
  const currentContext = useContext(recipeContext).ContextFoods;

  const { showInput, dataForFetch, handleCurrentPage, currentID,
    loading, handleFetch } = currentContext;
  const { redirectState } = dataForFetch;

  useEffect(() => {
    handleCurrentPage();
    if (params.i) {
      console.log({ params });
      handleFetch('themealdb', 'filter', 'i', params.i);
    } else {
      handleFetch('themealdb');
    }
  }, []);

  return (
    <div className="meals-container">
      <Header title="Comidas" hideSearch={ false } hideProfile={ false } />
      {showInput && <SearchInput />}
      {loading ? <> </> : <ComponentCategory />}
      {loading ? <ComponentLoading /> : <ComponentList />}
      {redirectState && <Redirect to={ `/comidas/${currentID}` } /> }
      <ComponentFooter />
    </div>
  );
}

export default Comidas;
