import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ExplorePages.css';
import '../styles/Buttons.css';

const Explore = () => {
  const history = useHistory();

  return (
    <div>
      <Header title="Explorar" />

      <div className="container select-buttons buttons-alignment">
        <button
          type="button"
          data-testid="explore-food"
          className="buttons"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          className="buttons"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
