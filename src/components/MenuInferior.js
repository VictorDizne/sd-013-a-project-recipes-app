import React from 'react';

export default function MenuInferior() {
  return (
    // teste
    <footer data-testid="footer">
      <a
        href="/drinks"
        data-testid="drinks-bottom-btn"
      >
        <img src="../images/drinkIcon.svg" alt="drinks" />
      </a>

      <a
        href="/explore"
        data-testid="explore-bottom-btn"
      >
        <img src="../images/exploreIcon.svg" alt="drinks" />
      </a>

      <a
        href="/foods"
        data-testid="food-bottom-btn"
      >
        <img src="../images/mealIcon.svg" alt="drinks" />
      </a>
    </footer>
  );
}
