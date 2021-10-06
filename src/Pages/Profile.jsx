import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Profile() {
  const pageTitle = {
    pageName: 'Perfil',
    setIcon: false,
  };
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header value={ pageTitle } />
      FOODS
      <div>
        <h3 data-testid="profile-email">
          { user !== null ? user.email : 'email' }
        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
