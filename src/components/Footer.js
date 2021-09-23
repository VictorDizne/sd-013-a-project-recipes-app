import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const goToDrinks = () => history.push('/bebidas');
  const goToExplore = () => history.push('/explorar');
  const goToMeals = () => history.push('/comidas');

  return (
    <div data-testid="footer" className="footer">
      <button type="button" onClick={ goToDrinks }>
        <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ goToExplore }>
        <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ goToMeals }>
        <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
      </button>
    </div>
  );
}

export default Footer;
