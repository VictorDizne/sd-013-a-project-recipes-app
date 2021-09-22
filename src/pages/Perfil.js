import React from 'react';
import Header from '../components/Header';
import ComponentFooter from '../components/ComponentFooter';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" hideSearch hideProfile={ false } />
      <ComponentFooter />
    </div>
  );
}

export default Perfil;
