import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

function Footer() {
  const history = useHistory();
  const handleClickDrink = () => history.push('/bebidas');
  const handleClickExplore = () => history.push('/explorar');
  const handleClickFood = () => history.push('/comidas');

  return (
    <footer data-testid="footer" style={ { position: 'fixed', bottom: '0px' } }>
      <input
        type="image"
        src={ drinkIcon }
        alt="drinks-bottom"
        data-testid="drinks-bottom-btn"
        onClick={ handleClickDrink }
      />
      <input
        type="image"
        src={ exploreIcon }
        alt="drinks-bottom"
        data-testid="explore-bottom-btn"
        onClick={ handleClickExplore }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="food-bottom"
        data-testid="food-bottom-btn"
        onClick={ handleClickFood }
      />
    </footer>
  );
}

export default Footer;
