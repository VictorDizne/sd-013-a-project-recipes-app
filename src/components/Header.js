import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = ({ pageTitle, history }) => {
  const [showBar, setShowBar] = useState(false);

  const checkObj = {
    'Explorar Origem': true,
    Comidas: true,
    Bebidas: true,
  };

  const handleSearchBtnClick = () => {
    setShowBar(!showBar);
  };

  return (
    <header>
      <input
        type="image"
        src={ profileIcon }
        data-testid="profile-top-btn"
        alt="profile icon"
        onClick={ () => history.push('/perfil') }
      />
      <h2 data-testid="page-title">{ pageTitle }</h2>
      {checkObj[pageTitle]
        && <input
          type="image"
          data-testid="search-top-btn"
          alt="search icon"
          src={ searchIcon }
          onClick={ handleSearchBtnClick }
        />}
      {showBar
      && (
        <div className="search-bar">
          <input data-testid="search-input" />
        </div>
      )}

    </header>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  history: PropTypes.node.isRequired,
};

export default Header;
