import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Header from '../components/Header';

function Explorar() {
  return (
    <div>
      <Header
        profile={
          <Link to="/perfil">
            <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
          </Link>
        }
        title="Explorar"
        search=""
      />
      <Link to="/explorar/comidas">Explorar Comidas</Link>
      <Link to="/explorar/bebidas">Explorar Bebidas</Link>
    </div>
  );
}

export default Explorar;
