import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setEmail(user.email);
  }, []);

  const goToLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header pageTitle="Perfil" history={ history } />
      <h1 data-testid="profile-email">
        { email }
      </h1>

      <Link to="/receitas-feitas" data-testid="profile-done-btn">
        Receitas Feitas
      </Link>

      <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </Link>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ goToLogin }
      >
        Sair
      </button>

      <Footer />
    </>
  );
}

Perfil.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
