import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { Stack, Button } from '@material-ui/core';
import profileIcon from '../images/profileIcon.svg';
import SearchButton from './searchButton';
import appContext from '../contexts/appContext';
import SearchBar from './searchBar';

export default function Header({ name, search }) {
  const history = useHistory();
  const { searchBool } = useContext(appContext);
  return (
    <header data-testid="header-test">
      <Stack direction="row" spacing={ 7.6 }>
        <Button
          type="button"
          className="profile-btn"
          onClick={ () => history.push('/perfil') }
        >
          <img
            alt="button-icon"
            src={ profileIcon }
            data-testid="profile-top-btn"
          />
        </Button>
        <h3 data-testid="page-title">{name}</h3>
        {search && <SearchButton />}
      </Stack>
      { searchBool && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  name: propTypes.string.isRequired,
  search: propTypes.bool.isRequired,
};
