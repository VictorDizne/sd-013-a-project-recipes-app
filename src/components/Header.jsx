import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { enableSearchBar, enableButton } from '../redux/actions';
import '../styles/header.css';
import getPlaceholder from '../utils/getPlaceholder';

function Header() {
  const enable = (
    useSelector(({ functionsReducer }) => functionsReducer.enableButton)
  );
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(enableSearchBar());
  };

  const historico = history.location.pathname;

  const handleProfile = () => {
    if (historico !== '/perfil') {
      history.push('/perfil');
    }
  };

  useEffect(() => {
    if (historico === '/comidas' || historico === '/bebidas'
     || historico === '/explorar/comidas/area') {
      dispatch(enableButton(true));
    } else {
      dispatch(enableButton(false));
    }
  });

  useEffect(() => {
    setState(getPlaceholder(historico));
  }, [historico]);

  return (
    <div className="header">
      <div className="header-profile">
        <button
          type="button"
          onClick={ handleProfile }
        >
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </button>
      </div>
      <div className="header-title">
        <h3
          data-testid="page-title"
        >
          {state}
        </h3>
      </div>
      <div className="header-search">
        {enable && (
          <button
            type="button"
            onClick={ handleClick }
          >
            <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
          </button>)}
      </div>
    </div>
  );
}

export default Header;
