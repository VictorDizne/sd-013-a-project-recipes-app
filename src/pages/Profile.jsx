import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/index';
import Header from '../components/Header';
import Footer from '../components/Footer';

import Main from './styles/ExplorerPage';

function Profile() {
  const getUserEmail = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <Main>
      <Header title="Perfil" />
      <p
        data-testid="profile-email"
      >
        { getUserEmail ? getUserEmail.email : 'Faça o login' }
      </p>

      <div className="container-button">
        <Button
          className="doneRecipes"
          type="button"
          id="profile-done-btn"
          buttonText="Receitas Feitas"
          onClick={ () => history.push('/receitas-feitas') }
        />
        <Button
          className="favoriteRecipes"
          type="button"
          id="profile-favorite-btn"
          buttonText="Receitas Favoritas"
          onClick={ () => history.push('/receitas-favoritas') }
        />
        <Button
          className="logoutButton"
          type="button"
          id="profile-logout-btn"
          buttonText="Sair"
          onClick={ logout }
        />
      </div>

      <Footer />
    </Main>
  );
}

export default Profile;
