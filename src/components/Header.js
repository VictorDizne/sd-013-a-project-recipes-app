import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ pageTitle, history }) => {
  const checkObj = {
    'Explorar Origem': true,
    Comidas: true,
    Bebidas: true,
  };

  return (
    <header>
      <input
        type="image"
        src="../src/images/profileIcon.svg"
        data-testid="profile-top-btn"
        alt="profile icon"
        onClick={ () => history.push('/perfil') }
      />
      <h2 data-testid="page-title">{ pageTitle }</h2>
      {checkObj[pageTitle]
    && <img
      data-testid="search-top-btn"
      alt="search icon"
      src="../src/images/searchIcon.svg"
    />}
    </header>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  history: PropTypes.node.isRequired,
};

export default Header;
