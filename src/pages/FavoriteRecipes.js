import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

import * as myFuncHelper from '../services/helpers';
import * as myFuncStorage from '../services/storage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  //const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [recipes, setRecipes] = useState([]);
  const [checkFavorite, setCheckFavorite] = useState(false);
  //const [checkProgress, setCheckProgress] = useState('Iniciar Receita');
  const [copySuccess, setCopySuccess] = useState('');
  //const [checkDone, setCheckDone] = useState(false);
  const [foodFilter, setFoodFilter] = useState(false);
  const [drinkFilter, setDrinkFilter] = useState(false);

  const getFavoriteRecipes = async () => {
    setRecipes(favoriteRecipes);
  }

  const setFavorite = (id, recipe) => {
    const newRecipes = recipes.filter((item) => item.id !== id);
    setRecipes(newRecipes);
    myFuncStorage.setFavoriteRecipe(id, recipe, 'Meal');
    setCheckFavorite(myFuncStorage.checkFavoriteRecipe(id));
  };

  const checkIsFavorite = (id) => {
    return recipes.some(recipe => recipe.id === id);
  };

  const handleFilterClick = ({target}) => {
    if (target.id === 'All') {
      setFoodFilter(false);
      setDrinkFilter(false);
    } else if (target.id === 'Food') {
      setFoodFilter(true);
    } else if (target.id === 'Drinks') {
      setDrinkFilter(true);
    }
  }

  useEffect(() => {
    getFavoriteRecipes();
    /*const paramsValue = {
      doneRecipes,
      progressRecipes,
      favoriteRecipes,
      //setCheckProgress,
      setCheckFavorite,
      setCheckDone,
      type: 'meals',
    };
    myFuncStorage.setAllLocalStorage(paramsValue);*/
  }, []);

  const renderFavoriteCard = (item, index) => {
    if (item.type === 'comida') {
      return (
        <div key={index} style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <Link to={`/comidas/${item.id}`}>
            <img data-testid={`${index}-horizontal-image`} src={item.image} style={{ heigth: '90px', width: '90px' }}></img>
          </Link>
          <div>
            <p data-testid={`${index}-horizontal-top-text`}>{`${item.area} - ${item.category}`}</p>
            <Link to={`/comidas/${item.id}`}>
              <p data-testid={`${index}-horizontal-name`} style={{ fontSize: '20px' }}>{item.name}</p>
            </Link>
            <div>
              <button
                type="button"
                data-testid={`${index}-horizontal-share-btn`}
                src={shareIcon}
                onClick={() => myFuncHelper
                  .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess)}
              >
                <img src={shareIcon} alt="share-icon" />
                {copySuccess}
              </button>
              <button
                type="button"
                data-testid={`${index}-horizontal-favorite-btn`}
                onClick={() => setFavorite(item.id, item)}
                src={checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon}
              >
                <img
                  src={checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon}
                  alt="favorite-icon"
                />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={index} style={{ display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <Link to={`/bebidas/${item.id}`}>
            <img data-testid={`${index}-horizontal-image`} src={item.image} style={{ heigth: '90px', width: '90px' }}></img>
          </Link>
          <div>
            <p data-testid={`${index}-horizontal-top-text`}>{item.alcoholicOrNot}</p>
            <Link to={`/bebidas/${item.id}`}>
              <p data-testid={`${index}-horizontal-name`}>{item.name}</p>
            </Link>
            <div>
              <button
                type="button"
                data-testid={`${index}-horizontal-share-btn`}
                src={shareIcon}
                onClick={() => myFuncHelper
                  .copyToClipBoard(`http://localhost:3000/comidas/${item.id}`, setCopySuccess)}
              >
                <img src={shareIcon} alt="share-icon" />
                {copySuccess}
              </button>
              <button
                type="button"
                data-testid={`${index}-horizontal-favorite-btn`}
                onClick={() => setFavorite(item.id, item)}
                src={checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon}
              >
                <img
                  src={checkIsFavorite(item.id) ? blackHeartIcon : whiteHeartIcon}
                  alt="favorite-icon"
                />
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button data-testid="filter-by-all-btn" id="All" onClick={ handleFilterClick } type="button">
        All
      </button>
      <button data-testid="filter-by-food-btn" id="Food" onClick={ handleFilterClick } type="button">
        Food
      </button>
      <button data-testid="filter-by-drink-btn" id="Drinks" onClick={ handleFilterClick } type="button">
        Drinks
      </button>
      <div style={ { display: 'flex', flexFlow: 'column', alignItems: 'center' } }>
        { (recipes !== null && foodFilter || drinkFilter) ? recipes.filter((iFilter) => foodFilter ? iFilter.type === 'comida' : iFilter.type === 'bebida').map((item, index) => renderFavoriteCard(item, index)) : recipes.map((item, index) => recipes !== null && renderFavoriteCard(item, index)) }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
