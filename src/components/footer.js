import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        onClick={ () => history.push('/bebidas') }
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img
          src={ drinkIcon }
          alt="drink Icon"
        />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/comidas') }
      >
        <img
          src={ mealIcon }
          alt="Meal Icon"
        />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/explorar') }
      >
        <img
          src={ exploreIcon }
          alt="Explore Icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
