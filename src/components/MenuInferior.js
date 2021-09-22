import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuInferior.css';

export default function MenuInferior() {
  return (
    <footer data-testid="footer">
      <Link
        data-testid="drinks-bottom-btn"
        to="/drinks"
      >
        <img src="../images/drinkIcon.svg" alt="drinks" />
      </Link>

      <Link
        data-testid="explore-bottom-btn"
        to="/explore"
      >
        <img src="../images/exploreIcon.svg" alt="drinks" />
      </Link>

      <Link
        data-testid="food-bottom-btn"
        to="/foods"
      >
        <img src="../images/mealIcon.svg" alt="drinks" />
      </Link>
    </footer>
  );
}
