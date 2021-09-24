import React from 'react';
import MenuInferior from '../Components/MenuInferior';
import Header from './Header';

export default function Profile() {
  const pageTitle = {
    pageName: 'Perfil',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>PROFILE</h2>
      <MenuInferior />
    </div>
  );
}
