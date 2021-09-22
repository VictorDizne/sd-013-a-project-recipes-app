import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../pages/styles/Footer.css';

function Footer() {
  const history = useHistory();

  const handleClick = ({ target: { name } }) => {
    history.push(`/${name}`);
  };

  const iconsLinks = (src, alt, testid, name) => (
    <button
      name={ name }
      type="button"
      className="footer-buttons"
      onClick={ handleClick }
    >
      <img name={ name } src={ src } alt={ alt } data-testid={ testid } width="30px" />
    </button>
  );

  return (
    <footer data-testid="footer" className="footer-container">
      <div className="footer-subcontainer">
        {iconsLinks(drinkIcon, 'Ícone Bebidas', 'drinks-bottom-btn', 'bebidas')}
        {iconsLinks(exploreIcon, 'Ícone Explorar', 'explore-bottom-btn', 'explorar')}
        {iconsLinks(mealIcon, 'Ícone Comidas', 'food-bottom-btn', 'comidas')}
      </div>
    </footer>
  );
}

export default Footer;
