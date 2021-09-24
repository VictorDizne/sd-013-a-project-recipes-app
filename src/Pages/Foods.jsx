import React from 'react';
import Header from './Header';

export default function Foods() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };

  return (
    <div>
      <Header value={ pageTitle } />
      Foods
    </div>
  );
}
