import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  const handleClickFavorite = () => {
    history.push('/receitas-feitas');
  };

  const handleClickDone = () => {
    history.push('/receitas-favoritas');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  const save = JSON.parse(localStorage.getItem('user'));
  const { email } = save;
  return (
    <div>
      <Header title="Perfil" />
      <div>
        <p data-testid="profile-email">{ email }</p>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ handleClickFavorite }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ handleClickDone }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logout() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
