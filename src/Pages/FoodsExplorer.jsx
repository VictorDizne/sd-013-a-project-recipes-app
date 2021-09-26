import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function FoodsExplorer() {
  const pageTitle = {
    pageName: 'Explorar Comidas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar Comidas</h2>
      <Footer />
    </div>
  );
}
