import React from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@material-ui/core';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function LowerMenu() {
  return (
    <footer
      data-testid="footer"
      style={ { backgroundColor: '#264653' } }
    >
      <Stack direction="row" spacing={ 10.5 }>
        <Link to="/bebidas">
          <Button
            type="button"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          >
            <img src={ drinkIcon } alt="drink-icon" />
          </Button>
        </Link>
        <Link to="/explorar">
          <Button
            type="button"
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
          >
            <img src={ exploreIcon } alt="search-icon" />
          </Button>
        </Link>
        <Link to="/comidas">
          <Button
            type="button"
            data-testid="food-bottom-btn"
            src={ mealIcon }
          >
            <img src={ mealIcon } alt="meal-icon" />
          </Button>
        </Link>
      </Stack>
    </footer>
  );
}

export default LowerMenu;
