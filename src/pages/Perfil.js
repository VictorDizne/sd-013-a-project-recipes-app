import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  if (!localStorage.user) {
    localStorage.setItem('user', JSON.stringify({
      email: '',
    }));
  }
  const user = JSON.parse(localStorage.getItem('user'));

  const handleOnClick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header tela="Perfil" showSearch={ false } />
      <h5 data-testid="profile-email">
        Email:
        {user.email}
      </h5>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleOnClick }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
