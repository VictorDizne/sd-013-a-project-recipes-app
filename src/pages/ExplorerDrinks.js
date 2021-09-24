import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';


function ExplorerDrinks() {
  const history = useHistory();

  return (
    <div>
      <Header text="Explorar Bebidas" />
      <button
         data-testid="explore-by-ingredient"
         onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >Por Ingredientes
      </button>
      <button data-testid="explore-surprise">Me Surpreenda!</button>
      <Footer />
    </div>
  );
}

export default ExplorerDrinks;
