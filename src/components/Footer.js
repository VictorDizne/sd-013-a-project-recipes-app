import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  const handleClickMeal = () => {
    history.push('/comidas');
  };

  const handleClickExplore = () => {
    history.push('/explorar');
  };

  const handleClickDrink = () => {
    history.push('/bebidas');
  };

  return (
    <footer data-testid="footer" className="fixed-footer">
      <button type="button" onClick={ handleClickMeal } className="footer-buttons">
        <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
      </button>
      <button type="button" onClick={ handleClickExplore } className="footer-buttons">
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ handleClickDrink } className="footer-buttons">
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
