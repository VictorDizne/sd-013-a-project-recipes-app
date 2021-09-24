import React from 'react';
import Header from './Header';

export default function Food() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  return (
    <div>
      <Header value={ pageTitle } />
      FOOD
    </div>
  );
}
