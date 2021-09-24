import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/MenuInferior.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function MenuInferior() {
  const history = useHistory();
  const clickDrinks = history.push('/bebidas');
  const clickExplore = history.push('/explorar');
  const clickFoods = history.push('/comidas');

  return (
    <footer data-testid="footer" className="footer">
      <button type="button" onClick={ () => clickDrinks }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="bebidas" />
      </button>

      <button type="button" onClick={ () => clickExplore }>
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explorar" />
      </button>

      <button type="button" onClick={ () => clickFoods }>
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="comidas" />
      </button>
    </footer>
  );
}
