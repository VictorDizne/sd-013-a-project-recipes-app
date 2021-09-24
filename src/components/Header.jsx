import PropTypes from 'prop-types';
import React/* , { useContext } */ from 'react';
import { Link } from 'react-router-dom';
/* import MyContext from '../context/myContext'; */
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ pageName, hasLupa }) => {
  const withSearchIMG = (
    <nav className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2 data-testid="page-title">{ pageName }</h2>
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="lupa"
      />
    </nav>
  );

  const withoutSearchIMG = (
    <nav className="header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2 data-testid="page-title">{ pageName }</h2>
    </nav>
  );

  return (
    hasLupa ? withSearchIMG : withoutSearchIMG
  );
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
