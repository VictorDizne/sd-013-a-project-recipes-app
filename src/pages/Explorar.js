import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explorar() {
  return (
    <div>
      <Header tela="Explorar" showSearch={ false } />
      <h1>Explorar</h1>
      <Footer />
    </div>
  );
}

export default Explorar;
