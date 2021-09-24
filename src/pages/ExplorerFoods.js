import { useHistory } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerFoods() {
  const history = useHistory();

  return (
    <div>
      <Header text="Explorar Comidas" />
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      > Por Ingredientes
      </button>
      <button
       data-testid="explore-by-area"
       > Por Local de Origem
      </button>
      <button data-testid="explore-surprise">Me Surpreenda!</button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
