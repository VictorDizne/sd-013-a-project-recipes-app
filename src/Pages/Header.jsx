import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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

  // function hiddenInput()
  //   if (showInput) {
  //     return (
  //       <input type="text" data-testid="search-input" />
  //     );
  //   }
  // }

  // function handleButton() {
  //   if (setIcon) {
  //     return (
  //       <>
  //         <button
  //           type="button"
  //           onClick={ isVerified }
  //         >
  //           <img data-testid="search-top-btn" src={ searchIcon } alt="buscar" />
  //         </button>
  //         { hiddenInput() }
  //       </>
  //     );
  //   }
  // }

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
      {/* { handleButton() } */}
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
      {showInput && <input type="text" data-testid="search-input" />}
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Header;
