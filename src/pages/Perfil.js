import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const history = useHistory();

  const storageUserEmail = localStorage.getItem('user');
  let userEmail = JSON.parse(storageUserEmail);

  if (!userEmail) {
    userEmail = { email: '' };
  }

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header />
      <main>
        <span data-testid="profile-email">{`Email: ${userEmail.email}`}</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Perfil;
