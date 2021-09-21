import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
/* import { exploreIcon, drinkIcon, mealIcon } from '../images'; */
const Footer = () => (
  <footer data-testid="footer">
    <Link to="/drinks">
      <img src={ drinkIcon } alt="Footer icon" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explore">
      <img src={ exploreIcon } alt="Footer icon" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/comidas">
      <img src={ mealIcon } alt="Footer icon" data-testid="food-bottom-btn" />
    </Link>
  </footer>
);

export default Footer;
