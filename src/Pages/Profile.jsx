import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Profile() {
  const pageTitle = {
    pageName: 'Perfil',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>PROFILE</h2>
      <Footer />
    </div>
  );
}
