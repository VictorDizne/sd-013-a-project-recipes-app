import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from './footer';

function Perfil() {
  const emailFromStorage = JSON.parse(localStorage.user).email;
  const history = useHistory();
  const exit = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h3 data-testid="profile-email">{emailFromStorage}</h3>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ exit }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
