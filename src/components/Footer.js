import React from 'react';

import drinks from '../images/drinkIcon.svg';
import explorar from '../images/exploreIcon.svg';
import comidas from '../images/mealIcon.svg';

function Footer() {
  return (
    <div
      style={ {
        position: 'fixed',
        left: '0px',
        bottom: '0px',
        display: 'flex',
        justifyContent: 'space-between',
        heigth: '100px' } }
      data-testid="footer"
    >
      <img data-testid="drinks-bottom-btn" src={ drinks } alt="drinks" />
      <img data-testid="explore-bottom-btn" src={ explorar } alt="explorar" />
      <img data-testid="food-bottom-btn" src={ comidas } alt="comidas" />
    </div>
  );
}

export default Footer;
