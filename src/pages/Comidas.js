import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';

function Comidas() {
  const [load, setLoad] = useState(false);

  function showHidden() {
    if (load === false) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }

  return (
    <div>
      <Header
        profile={
          <Link to="/perfil">
            <img alt="profile" data-testid="profile-top-btn" src={ profileIcon } />
          </Link>
        }
        title="Comidas"
        search={
          <button type="button" onClick={ showHidden }>
            <img alt="search" data-testid="search-top-btn" src={ searchIcon } />
          </button>
        }
      />
      {load && <SearchInput />}
    </div>
  );
}

export default Comidas;
