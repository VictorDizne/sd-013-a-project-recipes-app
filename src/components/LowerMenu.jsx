import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function LowerMenu() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
        >
          <img src={ drinkIcon } alt="drink-icon" />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
        >
          <img src={ exploreIcon } alt="search-icon" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          data-testid="food-bottom-btn"
          src={ mealIcon }
        >
          <img src={ mealIcon } alt="meal-icon" />
        </button>
      </Link>
    </footer>
  );
}

export default LowerMenu;
