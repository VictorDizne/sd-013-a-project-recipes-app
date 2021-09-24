import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  // const emailUser = localStorage.getItem(JSON.parse(user));

  return (
    <div>
      <Header text="Perfil" />
      <section>
        <div>
          <h1 data-testid="profile-email">Email</h1>
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
          <Button testID="profile-logout-btn">
            Sair
          </Button>
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
