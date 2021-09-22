import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinksPage() {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Bebidas" search />
      <Footer />
    </div>

  );
}

export default DrinksPage;
