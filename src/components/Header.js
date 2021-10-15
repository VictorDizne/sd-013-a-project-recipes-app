import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import Searchbar from './Searchbar';
import appContext from '../redux/appcontext';

const Header = ({ page, bebidas }) => {
  const [searchBar, showSearchbar] = useState(false);
  const { toggleSearchbarFilter } = useContext(appContext);

  function handleClick() {
    if (searchBar) {
      showSearchbar(false);
      toggleSearchbarFilter(false);
    } else {
      showSearchbar(true);
    }
  }

  if (searchBar) {
    return (
      <header>
        <div className="container2">
          <Link to="/perfil">
            <img
              src={ profileIcon }
              className="img-hover"
              alt="searchIcon"
              data-testid="profile-top-btn"
            />
          </Link>
          <h3 data-testid="page-title">{page}</h3>
          <button onClick={ handleClick } type="button" className="no-style-button">
            <img
              src={ SearchIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
            />
          </button>
        </div>
        <br />
        <div>
          <Searchbar bebidas={ bebidas } />
        </div>
      </header>
    );
  }

  return (
    <header className="container2">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          className="img-hover"
          alt="searchIcon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h3 data-testid="page-title">{page}</h3>
      <button
        onClick={ handleClick }
        type="button"
        className="no-style-button"
      >
        <img
          src={ SearchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />
      </button>
    </header>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  bebidas: PropTypes.bool.isRequired,
};

export default Header;
