import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header({ title, profile, search }) {
  return (
    <header className="header">
      { profile }
      <h1 data-testid="page-title">{ title }</h1>
      { search }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
}.isRequired;

export default Header;
