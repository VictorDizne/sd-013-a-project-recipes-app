import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import './css/profile.css';

export default function Profile() {
  const [localEmail, setLocalEmail] = useState('');
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user')) === null) {
      localStorage.setItem('user', JSON.stringify(''));
      const { email } = JSON.parse(localStorage.getItem('user'));
      setLocalEmail(email);
    }
    const { email } = JSON.parse(localStorage.getItem('user'));
    setLocalEmail(email);
  }, []);

  const history = useHistory();
  return (
    <>
    <Header name="Perfil" search={ false } />
    <div className="profile">
      <p data-testid="profile-email" className="email-container">{ localEmail }</p>
      <div className="buttons">
        <div className="buttonDiv">
          <button
            type="button"
            onClick={ () => history.push('/receitas-feitas') }
            data-testid="profile-done-btn"
            className="btn btn-secondary btn-sm btt-profile"
          >
            Receitas Feitas
          </button>
        </div>
        <div className="buttonDiv">
          <button
            type="button"
            onClick={ () => history.push('/receitas-favoritas') }
            data-testid="profile-favorite-btn"
            className="btn btn-secondary btn-sm btt-profile"
          >
            Receitas Favoritas
          </button>
        </div>
        <div className="buttonDiv">
          <button
            type="button"
            onClick={ () => {
              history.push('/');
              return localStorage.clear();
            } }
            data-testid="profile-logout-btn"
            className="btn btn-secondary btn-sm btt-profile"
          >
            Sair
          </button>
        </div>
      </div>
      <LowerMenu />
    </div>
    </>
  );
}
