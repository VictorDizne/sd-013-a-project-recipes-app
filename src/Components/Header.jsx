import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../Images/profileIcon.svg';
import searchIcon from '../Images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ value }) {
  const history = useHistory();
  const { pageName, setIcon } = value;
  const [showInput, setShowInput] = useState(false);

  function isVerified() {
    if (showInput === false) {
      return setShowInput(true);
    }
    return setShowInput(false);
  }

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          data-testid="profile-top-btn"
          alt="User"
          src={ profileIcon }
        />
      </button>
      <h1 data-testid="page-title">{ pageName }</h1>
      {setIcon
        && (
          <div>
            <button
              type="button"
              onClick={ isVerified }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="buscar" />
            </button>
          </div>
        )}
      {showInput && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Header;
