import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Perfil" />
      <Footer />
    </div>
  );
}

export default Profile;
