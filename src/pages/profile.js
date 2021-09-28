import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  console.log(history);
  return (
    <div>
      <Header name="Perfil" search={ false } />
      <p data-testid="profile-email">{ email }</p>
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
      <LowerMenu />
    </div>
  );
}
