import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from '../Components/Footer';
import Header from '../Components/Header';

export default function Explorer() {
  const pageTitle = {
    pageName: 'Explorar',
    setIcon: false,
  };
  const history = useHistory();
  const explorerComidas = () => history.push('/explorar/comidas');
  const explorerBebidas = () => history.push('/explorar/bebidas');

  return (
    <div>
      <Header value={ pageTitle } />
      <button
        onClick={ explorerComidas }
        type="button"
        data-testid="explore-food"
        name="Explorar Comidas"
      >
        Explorar Comidas
      </button>

      <button
        onClick={ explorerBebidas }
        type="button"
        data-testid="explore-drinks"
        name="Explorar bebidas"
      >
        Explorar Bebidas
      </button>
      <FooterMenu />
    </div>
  );
}
