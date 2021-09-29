import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { IngredientsInProgress } from './index';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './RecipeCard.css';

const copy = require('clipboard-copy');

export default function EspecificRecipeProgress(props) {
  const [especificRecipe, setEspecificRecipe] = useState({});
  const [stateDisabled, setStateDisabled] = useState(true);
  const [ingredientChecked, setIgredientChecked] = useState([]);
  const [ingredientCheckedLenght, setIgredientCheckedLenght] = useState();
  const [buttonClicked, setButtonClicked] = useState(whiteHeartIcon);
  const [divShare, setDivShare] = useState('displayNone');
  const {
    nameApi, drinkOrMeals, imgAndTitle, id, food, objType, localStorageObj } = props;
  const location = useLocation();

  const fetchRecipeId = async () => {
    const results = await fetch(`https://www.${nameApi}.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((res) => res[drinkOrMeals]);

    setEspecificRecipe({ ...results[0] });
  };

  useEffect(() => {
    fetchRecipeId();
  }, [id]);

  const category = () => {
    if (food) {
      return (
        <h3 data-testid="recipe-category">{ especificRecipe.strCategory }</h3>
      );
    }
    return (
      <h3 data-testid="recipe-category">{ especificRecipe.strAlcoholic }</h3>
    );
  };

  const handleFavoriteRecipe = () => {
    const getItemLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const idFavorite = (getItemLocalStorage) && getItemLocalStorage
      .find((elementFavorite) => elementFavorite.id === id);

    if (idFavorite) {
      setButtonClicked(blackHeartIcon);
    }
  };

  useEffect(() => {
    handleFavoriteRecipe();
  }, []);

  const handleDeleteLocalStorage = () => {
    const getItemLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const idFavorite = getItemLocalStorage
      .filter((elementFavorite) => elementFavorite.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(idFavorite));
    setButtonClicked(whiteHeartIcon);
  };

  const handleSaveLocalStorage = () => {
    const objectLocalStorage = {
      id: especificRecipe[`id${imgAndTitle}`],
      type: objType,
      area: especificRecipe.strArea || '',
      category: especificRecipe.strCategory,
      alcoholicOrNot: especificRecipe.strAlcoholic || '',
      name: especificRecipe[`str${imgAndTitle}`],
      image: especificRecipe[`str${imgAndTitle}Thumb`],
    };
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([objectLocalStorage]));
    } else {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('favoriteRecipes')),
          objectLocalStorage,
        ]));
    }
    setButtonClicked(blackHeartIcon);
  };

  const onClickButton = () => {
    if (buttonClicked === whiteHeartIcon) {
      handleSaveLocalStorage();
    } else {
      handleDeleteLocalStorage();
    }
  };

  const handleShareButton = () => {
    const arrayUrl = location.pathname.split('/');
    const stringPathname = `${arrayUrl[1]}/${arrayUrl[2]}`;
    copy(`http://localhost:3000/${stringPathname}`);

    setDivShare('displayInBlock');
  };

  useEffect(() => {
    if (ingredientChecked.length === ingredientCheckedLenght) {
      setStateDisabled(false);
    }
  }, [ingredientChecked]);

  return (
    <div>
      {console.log(especificRecipe)}
      <img
        data-testid="recipe-photo"
        src={ especificRecipe[`str${imgAndTitle}Thumb`] }
        alt={ especificRecipe[`str${imgAndTitle}`] }
        width="360"
      />
      <div>
        <div>
          <h1 data-testid="recipe-title">{ especificRecipe[`str${imgAndTitle}`] }</h1>
          { category() }
        </div>
        <div>
          <button type="button" onClick={ handleShareButton }>
            <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
          </button>
          <button
            type="button"
            onClick={ onClickButton }
          >
            <img data-testid="favorite-btn" src={ buttonClicked } alt="favorite-icon" />
          </button>
          <div className={ divShare }>Link copiado!</div>
        </div>
      </div>
      <div>
        <h2>Ingredients</h2>
        <IngredientsInProgress
          ingredientsList={ especificRecipe }
          setIgredientChecked={ setIgredientChecked }
          setIgredientCheckedLenght={ setIgredientCheckedLenght }
          ingredientChecked={ ingredientChecked }
          localStorageObj={ localStorageObj }
          id={ id }
        />
      </div>
      <div width="360">
        <h2>Instructions</h2>
        <p data-testid="instructions">{ especificRecipe.strInstructions }</p>
      </div>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="footer"
          id="finish-recipe-btn"
          disabled={ stateDisabled }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

EspecificRecipeProgress.propTypes = ({
  nameApi: PropTypes.string.isRequired,
  drinkOrMeals: PropTypes.string.isRequired,
  imgAndTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  food: PropTypes.bool.isRequired,
  objType: PropTypes.string.isRequired,
  localStorageObj: PropTypes.string.isRequired,
});
