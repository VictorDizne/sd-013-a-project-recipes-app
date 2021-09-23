import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => (
  <div data-testid="footer" className="Footer">
    <Link
      to="/comidas"
      type="button"
      data-testid="food-bottom-btn"
      src="src/images/drinkIcon.svg" alt="icone de bebida" />
      <Link
      to="/explorar"
      type="button"
      data-testid="explore-bottom-btn"
      >
      <img src="src/images/exploreIcon.svg" alt="icone de explorar" />
    </Link>
    <Link
      to="/bebidas"
      type="button"
      data-testid="food-bottom-btn"
    >
      <img src="src/images/mealIcon.svg" alt="icone de comida" />
    </Link>
  </div>
);

export default Footer;
