import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

import '../styles/Footer.css';

// Componente funcional de Rodapé do App Receitas
function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <Link to="/bebidas">
          <img
            id="icon"
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
          />
        </Link>
        <Link to="/explorar">
          <img
            id="icon"
            src={ exploreIcon }
            alt="explorar"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <img
            id="icon"
            src={ mealIcon }
            alt="comidas"
            data-testid="food-bottom-btn"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
