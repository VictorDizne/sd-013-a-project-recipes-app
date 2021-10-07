// @ts-check
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';
import './Styles/Perfil.css';

function Perfil() {
  const [currentEmail, setCurrentEmail] = useState('');
  function getEmail() {
    const emailObject = localStorage.getItem('user');
    if (!emailObject) return;
    const emailParsed = JSON.parse(emailObject).email;
    setCurrentEmail(emailParsed);
  }

  useEffect(
    getEmail, [],
  );
  return (
    <div>
      <Header title="Perfil" hideSearch hideProfile={ false } />
      <ComponentFooter />
      <div className="perfil-container">
        <p data-testid="profile-email">{currentEmail}</p>

        <Link
          to="/receitas-feitas"
          data-testid="profile-done-btn"
          className="Link-container"
        >
          Receitas Feitas
        </Link>

        <Link
          to="/receitas-favoritas"
          data-testid="profile-favorite-btn"
          className="Link-container"
        >
          Receitas Favoritas
        </Link>

        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
          className="button-exit"
        >
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Perfil;
