import React from 'react';
import Header from './Header';

export default function FoodsByLocal() {
  const pageTitle = {
    pageName: 'Explorar Origem',
    setIcon: true,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      FOODS LOCAL
    </div>
  );
}
