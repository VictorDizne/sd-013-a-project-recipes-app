import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import Context from '../Context/Context';
import Category from './Category';

const maxCharacters = 14;
const maxCard = 11;

function Header() {
  const history = useHistory();
  const [showInput, setShowInput] = useState(true);

  const {
    handleInputText,
    handleInputRadio,
    path,
    pathRotesVerify,
    pathLong,
    shortPath,
    handleClickFetch,
    data,
    changePage,
    category,
  } = useContext(Context);

  const formataNome = () => (
    path.length > maxCharacters
      ? pathLong : shortPath
  );

  const clickDisable = () => {
    setShowInput(!showInput);
  };

  useEffect(() => {
    changePage();
  }, [changePage, data, history, path]);

  return (
    <div className="header">
      <Link to="/perfil">
        <img
          className="elementsFooter"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        />
      </Link>
      <h1 className="elementsFooter" data-testid="page-title">{formataNome()}</h1>
      { pathRotesVerify
        ? null
        : (
          <button className="elementsFooter" type="button" onClick={ clickDisable }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
          </button>
        )}
      {
        !showInput
          ? (
            <input
              data-testid="search-input"
              disabled={ showInput }
              onChange={ handleInputText }
            />
          ) : null
      }
      <div>
        <input
          type="radio"
          value="ingrediente"
          name="select-search"
          data-testid="ingredient-search-radio"
          onChange={ handleInputRadio }
        />
        ingrediente
        <input
          type="radio"
          value="nome"
          name="select-search"
          data-testid="name-search-radio"
          onChange={ handleInputRadio }
        />
        nome
        <input
          type="radio"
          value="primeira letra"
          name="select-search"
          data-testid="first-letter-search-radio"
          onChange={ handleInputRadio }
        />
        primeira letra
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleClickFetch }
        >
          Buscar
        </button>
      </div>
      <Category category={ category } />
      {
        data.filter((el, i) => (i <= maxCard ? el : false))
          .map(({ strDrink,
            strDrinkThumb, strMeal, strMealThumb, idDrink, idMeal,
          }, i) => (
            <div
              data-testid={ `${i}-recipe-card` }
              key={ i }
            >
              <Link to={ `/${path}/${idDrink || idMeal}` }>
                <img
                  alt={ strDrink || strMeal }
                  data-testid={ `${i}-card-img` }
                  src={ strDrinkThumb || strMealThumb }
                  width="200"
                />
              </Link>
              <h1 data-testid={ `${i}-card-name` }>{ strDrink || strMeal }</h1>
            </div>))
      }
    </div>
  );
}
export default Header;
