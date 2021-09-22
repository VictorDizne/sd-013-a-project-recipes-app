import React from 'react';
import Header from '../components/Header';

function ExplorerFoodsByOrigin() {
  const secondButton = true;
  return (
    <div>
      <Header text="Explorar Origem" secondButton={ secondButton } />
      <h3>.</h3>
    </div>
  );
}

export default ExplorerFoodsByOrigin;
