import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  const history = useHistory();
  const hadleExploreDrink = () => history.push('/explorar/bebidas');
  const handleExploreMeals = () => history.push('/explorar/comidas');

  return (
    <>
      <Header />
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ hadleExploreDrink }
      >
        Explorar Bebidas
      </button>
      <button
        onClick={ handleExploreMeals }
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <Footer />
    </>
  );
}

export default Explore;
