import React, { useContext } from 'react';
import EveryRecipeCard from '../../components/everyRecipeCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import recipesContext from '../../context';

function Comidas() {
  const { loading } = useContext(recipesContext);
  return (
    <>
      <Header title="Comidas" />
      { loading ? <p>LOADING...</p> : <EveryRecipeCard title="Comidas" />}
      <Footer />
    </>
  );
}

export default Comidas;
