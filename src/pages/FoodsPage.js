import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodsPage() {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <Header title="Comidas" search />
      <Footer />
    </div>
  );
}

export default FoodsPage;
