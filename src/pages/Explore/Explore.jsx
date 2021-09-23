import React from 'react';
import { useHistory } from 'react-router';
import { Header, Footer } from '../../components/General';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header title="Explorar" />
      <div>
        <button
          type="button"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
