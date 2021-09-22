import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      <Header
        profile={
          <Link to="/perfil">
            <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
          </Link>
        }
        title="Explorar Bebidas"
        search=""
      />
      <Link to="/explorar/bebidas/ingredientes">Por Ingredientes</Link>
    </div>
  );
}

export default ExplorarBebidas;
