import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import metalIcon from '../images/mealIcon.svg';

import '../PaginasCss/Footer.css';

const Footer = () => (
  <div data-testid="footer" className="Footer">
    <Link
      to="/comidas"
      type="button"
      data-testid="food-bottom-btn"
      src={ metalIcon }
    >
      <img src={ metalIcon } alt="icone de comida" />
    </Link>
    <Link
      to="/explorar"
      type="button"
      data-testid="explore-bottom-btn"
      src={ exploreIcon }
    >
      <img src={ exploreIcon } alt="icone de explorar" />
    </Link>
    <Link
      to="/bebidas"
      type="button"
      data-testid="drinks-bottom-btn"
      src={ drinkIcon }
    >
      <img src={ drinkIcon } alt="icone de bebida" />
    </Link>
  </div>
);

export default Footer;
