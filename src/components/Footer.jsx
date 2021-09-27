import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '.';
import { drinkIcon, exploreIcon, mealIcon } from '../images';

function Footer() {
  const history = useHistory();

  return (
    <footer className="footer" data-testid="footer">
      <Button
        id="food-bottom-btn"
        onClick={ history.push('/comidas') }
        buttonText={
          <img
            src={ mealIcon }
            alt="Fork and spoon Icon"
            className="foodsBtnIcon"
          />
        }
      />
    </footer>
  );
}

export default Footer;
