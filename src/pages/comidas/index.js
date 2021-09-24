import React, { useContext } from 'react';
import EveryMealCard from '../../components/everyMealCard';
import Footer from '../../components/footer';
import Header from '../../components/header';
import recipesContext from '../../context';

function Comidas() {
  const { loading } = useContext(recipesContext);
  return (
    <>
      <Header title="Comidas" />
      { loading ? <p>LOADING...</p> : <EveryMealCard />}
      <Footer />
    </>
  );
}

export default Comidas;