import React from 'react';
import { Link } from 'react-router-dom';
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
        heigth: '100px',
        width: '360px',
        padding: '10px' } }
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img data-testid="drinks-bottom-btn" src={ drinks } alt="drinks" />
      </Link>
      <Link to="/explorar">
        <img data-testid="explore-bottom-btn" src={ explorar } alt="explorar" />
      </Link>
      <Link to="/comidas">
        <img data-testid="food-bottom-btn" src={ comidas } alt="comidas" />
      </Link>
    </div>
  );
}

export default Footer;
