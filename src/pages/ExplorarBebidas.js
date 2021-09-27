import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      <Header tela="Explorar Bebidas" showSearch={ false } />
      <h1>ExplorarBebidas</h1>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
