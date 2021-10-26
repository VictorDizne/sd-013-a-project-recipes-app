import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
// import appContext from '../redux/appcontext';

const Perfil = () => {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail === null) {
      setEmail('Erro, email não encontrado');
    } else {
      setEmail(userEmail.email);
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile">
      <div className="profileHeader">
        <HeaderWithoutSearch page="Perfil" />
      </div>
      <div className="profileBody">
        <br />
        <h4 data-testid="profile-email">{email}</h4>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          Sair
        </button>
        <Footer />
      </div>
    </div>
  );
};

export default Perfil;
