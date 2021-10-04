import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (emailLocalStorage) {
      setEmail(emailLocalStorage.email);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Perfil" />
      <p data-testid="profile-email">{email}</p>
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
          onClick={ () => logout() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
