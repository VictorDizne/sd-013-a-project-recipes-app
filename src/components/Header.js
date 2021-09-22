import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  const [handleInput, setHandleInput] = useState(false);

  const renderButtonSearch = () => (
    <button
      type="button"
      onClick={ () => setHandleInput(!handleInput) }
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search"
      />
    </button>
  );

  return (
    <div style={ { display: 'flex', justifyContent: 'space-between', heigth: '100px' } }>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile"
        />
      </Link>
      <h3 data-testid="page-title">{title}</h3>
      { search && renderButtonSearch() }

      { handleInput && <input
        type="text"
        data-testid="search-input"
      /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
