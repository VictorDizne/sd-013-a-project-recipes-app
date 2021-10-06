/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { fetchMealsByQuery, fetchDrinksByQuery } from '../../services/API';
import '../../CSS/Header.css';

function Header({ title, search }) {
  const [disable, setDisable] = useState(false);
  const [type, setType] = useState('');
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async () => {
    if (type === 'f' && query.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (title === 'Comidas') {
      const fetchMeals = await fetchMealsByQuery(type, query, dispatch);

      if (!fetchMeals) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }

      if (fetchMeals.length === 1) {
        history.push(`/comidas/${fetchMeals[0].idMeal}`);
      }
    }

    if (title === 'Bebidas') {
      const fetchDrinks = await fetchDrinksByQuery(type, query, dispatch);

      if (!fetchDrinks) {
        return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }

      if (fetchDrinks.length === 1) {
        history.push(`/bebidas/${fetchDrinks[0].idDrink}`);
      }
    }
  };

  return (
    <header className="header-container">
      <div className="header-search">
        <button
          src=""
          type="button"
          className="header-avatar"
        >
          <Link to="/perfil">
            <img src={ profileIcon } alt="avatar" data-testid="profile-top-btn" />
          </Link>
        </button>

        <div
          data-testid="page-title"
        >
          <h1 className="header-title">{ title }</h1>
        </div>

        { search && (
          <button
            type="button"
            className="header-glass"
            onClick={ () => setDisable(!disable) }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="magnifying glass"
            />
          </button>)}
      </div>
      { disable && (
        <>
          <div>
            <input
              onChange={ (e) => setQuery(e.target.value) }
              value={ query }
              type="text"
              className="header-input"
              placeholder="Buscar Receita"
              data-testid="search-input"
            />
          </div>

          <div className="radio-container">
            <label htmlFor="ingrediente">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="ingrediente"
                type="radio"
                value="i"
                data-testid="ingredient-search-radio"
              />
              Ingrediente
            </label>

            <label htmlFor="nome">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="nome"
                type="radio"
                value="s"
                data-testid="name-search-radio"
              />
              Nome
            </label>

            <label htmlFor="primeira-letra">
              <input
                onChange={ (e) => setType(e.target.value) }
                className="radio-input"
                name="options"
                id="primeira-letra"
                type="radio"
                value="f"
                data-testid="first-letter-search-radio"
              />
              Primeira Letra
            </label>
          </div>
          <button
            className="header-button"
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleClick }
          >
            Buscar
          </button>
        </>
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: false,
};
