import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import appContext from '../contexts/appContext';
import searchIcon from '../images/searchIcon.svg';

export default function SearchButton() {
  const { setSearch, searchBool } = useContext(appContext);

  return (
    <div>
      <Button
        type="button"
        className="btn-search"
        onClick={ () => setSearch(!searchBool) }
      >
        <img src={ searchIcon } alt="ícone de busca" data-testid="search-top-btn" />
      </Button>
    </div>
  );
}
