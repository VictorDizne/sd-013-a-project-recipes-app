import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerDrinks() {
  const history = useHistory();

  return (
    <div>
      <Header text="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button data-testid="explore-surprise" type="button">Me Surpreenda!</button>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
