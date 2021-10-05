import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../Context/Context';
import Button from '../components/Button';
import Input from '../components/Input';
import FavoriteDrink from '../components/FavoriteDrink';
// import useFetchRecipes from '../Hooks/useFetchRecipes';
import '../App.css';

function DrinksProcess(props) {
  const { setFavorite, setId } = useContext(Context);
  const [details, setDetails] = useState();
  const [message, setMessage] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  // const [favIngredients, setFavIngredients] = useState(false);

  useEffect(() => {
    const { match: { params: { id: idLocation } } } = props;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idLocation}`;
    async function fetchResult() {
      const result = await (await fetch(url)).json();
      setDetails(result.drinks[0]);
      setFavorite(result.drinks[0]);
      setId(result.drinks[0].idDrink);
      // console.log(details, result.drinks[0], '1231');
    }
    fetchResult();
  }, []);

  // useEffect(() => {
  //   const listFavorite = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
  //   const newArrayIngredients = listFavorite.filter((list) => list.id === id);
  //   if (newArrayIngredients[0]) {
  //     return setFavIngredients(true);
  //   }
  // }, [id]);

  // const ingredientsStorage = () => {
  //   const handleFavIngredients = () => {
  //     const favorited = {
  //       cocktails: {
  //         [favorite.idDrink]: [],
  //       },
  //       meals: {
  // [favorite.idDrink]: [],
  //       },
  //     };

  //     if (favHeart === false) {
  //       const recipesFavorited = JSON.parse(localStorage.getItem('favoriteRecipes')
  //       || '[]');
  //       recipesFavorited.push(favorited);
  //       localStorage.setItem('favoriteRecipes', JSON.stringify(recipesFavorited));
  //       return setFavHeart(true);
  //     }
  //     if (favHeart === true) {
  //       const listFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //       const newArray = listFavorite.filter((list) => list.id !== favorited.id);
  //       localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  //       return setFavHeart(false);
  //     }
  //   };
  // };

  const buttonAbled = () => {
    const arrayIng = Object.keys(details)
      .filter((detail) => detail.includes('strIngredient'))
      .filter((ing) => details[ing]);
    const arrayCheckbox = document.querySelectorAll('input:checked');
    // console.log(arrayCheckbox, 'hello');
    // console.log(arrayIng);
    if (arrayCheckbox.length === arrayIng.length) {
      return setDisabledButton(false);
    }
    return setDisabledButton(true);
  };

  const checkboxRisk = ({ target }) => {
  // ingredientsStorage();
    buttonAbled();
    const parent = target.parentNode;
    const li = parent.parentNode;
    return target.checked
      ? li.classList.add('checkbox-risk')
      : li.classList.remove('checkbox-risk');
  };

  const renderDetails = () => {
    const urlLocal = window.location.href;
    const urlShare = urlLocal.split('/in')[0];
    if (details !== undefined) {
      return (
        <section>
          <img src={ details.strDrinkThumb } alt="" data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{ details.strDrink }</h2>
          <Button
            testID="share-btn"
            handleClick={ () => {
              navigator.clipboard.writeText(urlShare);
              setMessage(true);
            } }
          >
            Compartilhar
          </Button>
          { message ? <h4>Link copiado!</h4> : null }
          <FavoriteDrink />
          <ul>
            <h3>Ingredientes</h3>
            {Object.keys(details)
              .filter((detail) => detail.includes('strIngredient'))
              .filter((ing) => details[ing])
              .map((ingredient, i) => (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-step` }
                >
                  <Input
                    inputType="checkbox"
                    handleChange={ checkboxRisk }
                    name={ ingredient }
                    id={ ingredient }
                  />
                  {details[`strMeasure${i + 1}`]}
                  {details[`strMeasure${i + 1}`] ? ' of ' : null}
                  {details[ingredient]}
                </li>))}
          </ul>
          <h4 data-testid="recipe-category">{ details.strAlcoholic }</h4>
          <p data-testid="instructions">{ details.strInstructions }</p>
          <Link to="/receitas-feitas">
            <Button
              testID="finish-recipe-btn"
              disabled={ disabledButton }
            >
              Finalizar Receita
            </Button>
          </Link>
        </section>
      );
    }
  };

  return (
    <div>
      { details !== null || details !== undefined ? renderDetails() : null }
    </div>
  );
}

DrinksProcess.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinksProcess;
