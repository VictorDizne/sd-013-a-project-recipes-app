import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

const Header = ({ page }) => (
  <header className="header-without-search-container">
    <Link to="/perfil">
      <img src={ profileIcon } alt="searchIcon" data-testid="profile-top-btn" />
    </Link>
    <h3 data-testid="page-title">{page}</h3>
  </header>
);

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
