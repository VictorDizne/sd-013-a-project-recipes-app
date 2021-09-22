import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Header from '../components/Header';

function ExplorarComidas() {
  return (
    <div>
      <Header
        profile={
          <Link to="/perfil">
            <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
          </Link>
        }
        title="Explorar Comidas"
        search=""
      />
      <Link to="/explorar/comidas/ingredientes">Por Ingredientes</Link>
    </div>
  );
}

export default ExplorarComidas;
