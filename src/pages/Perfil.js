import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function Perfil() {
  const [currentEmail, setCurrentEmail] = useState('');
  function getEmail() {
    const emailObject = localStorage.getItem('user');
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

      <p data-testid="profile-email">{currentEmail}</p>

      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas Feitas
      </Link>

      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </Link>

      <Link
        to="/"
        data-testid="profile-logout-btn"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </div>
  );
}

export default Perfil;
