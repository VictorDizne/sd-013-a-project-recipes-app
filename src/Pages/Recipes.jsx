import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Recipes() {
  const pageTitle = {
    pageName: 'Receitas Favoritas',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>FOODS</h2>
      <Footer />
    </div>
  );
}
