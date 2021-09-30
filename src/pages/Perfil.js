import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Perfil({ history }) {
  return (
    <>
      <Header pageTitle="Perfil" history={ history } />
      <div data-testid="profile-email"> E-mail </div>
      <div data-testid="profile-done-btn"> Receitas Feitas </div>
      <div data-testid="profile-favorite-btn">Receitas Favoritas</div>
      <div data-testid="profile-logout-btn">Sair</div>
      <Footer />
    </>
  );
}

Perfil.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
