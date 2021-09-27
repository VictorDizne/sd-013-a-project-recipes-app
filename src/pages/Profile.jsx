import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/index';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const getUserEmail = () => {
    if (localStorage.getItm('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  };

  const history = useHistory();

  return (
    <div>
      <Header title="Perfil" />
      <h1
        data-testid="profile-email"
      >
        { getUserEmail() }
      </h1>
      <Button
        className="doneRecipes"
        type="button"
        buttonText="Receitas Feitas"
        onClick={ history.push('/receitas-feitas') }
      />
      <Button
        className="favoriteRecipes"
        type="button"
        buttonText="Receitas Favoritas"
        onClick={ history.push('/receitas-favoritas') }
      />
      <Button
        className="logoutButton"
        type="button"
        buttonText="Sair"
        onClick={ history.push('/') }
      />
      <Footer />
    </div>
  );
}

export default Profile;
