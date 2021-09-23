import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <Button
        testID="drinks-bottom-btn"
        image={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinks" />
      </Button>
    </Link>
    <Link to="/explorar">
      <Button
        testID="explore-bottom-btn"
        image={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore" />
      </Button>
    </Link>
    <Link to="/comidas">
      <Button
        testID="food-bottom-btn"
        image={ mealIcon }
      >
        <img src={ mealIcon } alt="foods" />
      </Button>
    </Link>
  </footer>
);

export default Footer;
