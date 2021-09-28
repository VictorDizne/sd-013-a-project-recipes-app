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
    <div className="profile">
      <h3 className="email" data-testid="profile-email">{emailFromStorage}</h3>
      <button
        className="profile-buttons"
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        className="profile-buttons"
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        className="profile-buttons"
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
