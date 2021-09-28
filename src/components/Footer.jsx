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
        onClick={ () => history.push('/comidas') }
        buttonText={
          <img
            src={ mealIcon }
            alt="Fork and spoon Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        id="explore-bottom-btn"
        onClick={ () => history.push('/explorar') }
        buttonText={
          <img
            src={ exploreIcon }
            alt="Compass Icon"
            className="foodsBtnIcon"
          />
        }
      />
      <Button
        id="drinks-bottom-btn"
        onClick={ () => history.push('/bebidas') }
        buttonText={
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            className="foodsBtnIcon"
          />
        }
      />
    </footer>
  );
}

export default Footer;
