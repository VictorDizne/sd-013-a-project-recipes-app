import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();
  const [email, setEmail]

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

  useEffect(() => {
    const save = JSON.parse(localStorage.getItem('user'));
    console.log(save);
  }, []);

  return (
    <div>
      <Header title="Perfil" />
      <div>
        <p data-testid="profile-email">nada</p>
      </div>
      <div className="container">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => handleClickFavorite() }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => handleClickDone() }
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
