import React from 'react';
import Header from '../components/Header';
/* import PropTypes from 'prop-types'; */

function Foods() {
  const secondButton = true;
  return (
    <h1>
      <Header text="Comidas" secondButton={ secondButton } />
    </h1>
  );
}

export default Foods;
