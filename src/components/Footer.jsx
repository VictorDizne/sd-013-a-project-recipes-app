import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import './footer.css';

function Footer() {
  return (
    <div className="footer__container" data-testid="footer">
      <Link
        className="footer__link drinks"
        to="../Pages/Drinks"
      >
        <img
          src={ drinkIcon }
          alt="link para a pagina de Drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link
        className="footer__link explorer"
        to="../Pages/ExploreScreen"
      >
        <img
          src={ exploreIcon }
          alt="link para a página de explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link
        className="footer__link food"
        to="../Pages/Food"
      >
        <img
          src={ mealIcon }
          alt="link para a página de comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
