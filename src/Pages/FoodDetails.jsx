import React from 'react';
import Header from './Header';

export default function FoodDetails() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  return (
    <div>
      <Header value={ pageTitle } />
      FoodDetails
    </div>
  );
}