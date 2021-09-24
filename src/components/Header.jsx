import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/* import MyContext from '../context/myContext'; */
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ pageName, hasLupa }) => {
  const [hidden, setHidden] = useState(true);

  const handleClick = () => {
    setHidden(!hidden);
  };

  const searchInput = (
    <input data-testid="search-input" type="text" />
  );

  const withSearchIMG = (
    <>
      <nav className="header">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <h2 data-testid="page-title">{ pageName }</h2>
        <button type="button" onClick={ handleClick }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="lupa"
          />
        </button>
      </nav>
      { hidden ? null : searchInput }
    </>
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
