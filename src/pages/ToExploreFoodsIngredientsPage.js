import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ToExploreFoodsIngredientsPage() {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Explorar Ingredientes" />
      <Footer />
    </div>
  );
}

export default ToExploreFoodsIngredientsPage;
