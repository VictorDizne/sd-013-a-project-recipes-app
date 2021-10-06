import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import '../styles/Buttons.css';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

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
    const getEmail = JSON.parse(localStorage.getItem('user'));
    if (getEmail) {
      setEmail(getEmail.email);
    }
  }, []);

  return (
    <div>
      <Header title="Perfil" />

      <div className="container container-profile">
        <div className="text-email">
          <p data-testid="profile-email">{ email }</p>
        </div>
        <div className="select-buttons buttons-alignment">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => handleClickFavorite() }
            className="buttons"
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => handleClickDone() }
            className="buttons"
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => logout() }
            className="buttons"
          >
            Sair
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
