import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function DrinksExplorer() {
  const pageTitle = {
    pageName: 'Explorar Bebidas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar Bebidas</h2>
      <Footer />
    </div>
  );
}
