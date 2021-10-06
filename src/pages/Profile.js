import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  function showEmail() {
    const emailUser = localStorage.getItem('user');
    const emailObject = JSON.parse(emailUser);
    if (emailObject !== null) {
      return emailObject.email;
    }
  }

  function handleClick() {
    return localStorage.clear();
  }

  return (
    <div>
      <Header text="Perfil" />
      <section>
        <div>
          <h1 data-testid="profile-email">{showEmail()}</h1>
        </div>
        <Link to="/receitas-feitas">
          <Button testID="profile-done-btn">
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button testID="profile-favorite-btn">
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button handleClick={ handleClick } testID="profile-logout-btn">
            Sair
          </Button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
