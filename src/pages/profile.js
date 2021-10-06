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
  console.log(history);
  return (
    <div>
      <Header name="Perfil" search={ false } />
      <p data-testid="profile-email">{ localEmail }</p>
      <div className="buttons">
        <button
          type="button"
          onClick={ () => history.push('/receitas-feitas') }
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          onClick={ () => history.push('/receitas-favoritas') }
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          onClick={ () => {
            history.push('/');
            return localStorage.clear();
          } }
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <LowerMenu />
    </div>
  );
}
