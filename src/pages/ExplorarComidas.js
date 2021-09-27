import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  return (
    <div>
      <Header tela="Explorar Comidas" showSearch={ false } />
      <h1>ExplorarComidas</h1>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
