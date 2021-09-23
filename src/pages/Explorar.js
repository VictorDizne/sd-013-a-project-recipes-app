import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function Explorar() {
  const history = useHistory();

  const handleClickFood = () => {
    history.push('/explorar/comidas');
  };

  const handleClickDrinks = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div>
      <Header title="Explorar" hideSearch hideProfile={ false } />
      <button
        type="button"
        data-testid="explore-food"
        onClick={ handleClickFood }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ handleClickDrinks }
      >
        Explorar Bebidas
      </button>
      <ComponentFooter />

    </div>
  );
}

export default Explorar;
