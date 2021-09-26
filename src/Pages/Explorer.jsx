import React from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function Explorer() {
  const pageTitle = {
    pageName: 'Explorar',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      <h2>Explorar</h2>
      <Footer />
    </div>
  );
}
