import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchAPI from '../../services/fetchAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Footer from '../../components/footer';
import recipesContext from '../../context';

const copy = require('clipboard-copy');

function DrinkDetails({ match: { params: { id } } }) {
  const { details,
    loading,
    setLoading,
    ingredientes,
    medida,
    setDetails,
    setIngredientes,
    setMedida,
    setFavRecipes,
    favRecipes } = useContext(recipesContext);

  const ingredientsList = (drinkInfo) => {
    const arr = Object.keys(drinkInfo);
    const ingredients = arr
      .filter((k) => (k.includes('strIngredient') ? k : null))
      .map((values) => drinkInfo[values])
      .filter((ingredient) => (ingredient));
    setIngredientes(ingredients);
  };

  const checkFavorite = () => {
    if (localStorage.favoriteRecipes) {
      const receitas = JSON.parse(localStorage.favoriteRecipes);
      return receitas.some((recipe) => ((recipe).id) === id);
    }
    return false;
  };

  const initRecipe = (info) => {
    const idDaReceita = info.idDrink;
    const iniciar = {
      pathname: `/bebidas/${idDaReceita}/in-progress`,
      info,
    };
    return iniciar;
  };

  const favoritar = () => {
    const obj = {
      id: details.idDrink,
      type: 'Drink',
      area: null,
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    if (localStorage.favoriteRecipes) {
      const parseVersion = JSON.parse(localStorage.favoriteRecipes);
      localStorage.favoriteRecipes = JSON.stringify([...parseVersion, (obj)]);
      return setFavRecipes(true);
    }
    localStorage.favoriteRecipes = JSON.stringify([obj]);
  };

  const desfavoritar = () => {
    const localTest = JSON.parse(localStorage.favoriteRecipes);
    const desfa = localTest.filter((recipe) => ((recipe).id) !== id);
    localStorage.favoriteRecipes = JSON.stringify(desfa);
    return setFavRecipes(false);
  };

  function handleFavButton() {
    return checkFavorite() ? desfavoritar() : favoritar();
  }

  const compartilhar = () => {
    copy(window.location);
    global.alert('Link copiado!');
  };

  const measureList = (drinksInfo) => {
    const arr = Object.keys(drinksInfo);
    const measures = arr
      .filter((k) => (k.includes('strMeasure') ? k : null))
      .map((values) => drinksInfo[values])
      .filter((measure) => (measure));
    setMedida(measures);
  };

  useEffect(() => {
    const fetchByID = async () => {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await fetchAPI(URL);
      setDetails(drinks[0]);
      ingredientsList(drinks[0]);
      measureList(drinks[0]);
      setLoading(false);
    };
    checkFavorite();
    fetchByID();
  }, [favRecipes]);

  if (loading) return 'loading';

  return (
    <>
      <img
        className="meal-img"
        data-testid="recipe-photo"
        src={ details.strDrinkThumb }
        alt="Meal"
      />
      <h2 data-testid="recipe-title">{details.strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ compartilhar }
      >
        <img
          src={ shareIcon }
          alt="share button"
        />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavButton }
      >
        <img
          src={ checkFavorite() ? blackHeartIcon : whiteHeartIcon }
          alt="Favoritar"
        />
      </button>
      <ul data-testid={ `${id}-ingredient-name-and-measure` }>
        {ingredientes
          .map((ing, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${medida[index]} of ${ing}`}
            </li>
          ))}
      </ul>
      <p data-testid="instructions">{ details.strInstructions }</p>
      <Link to={ () => initRecipe(details) }>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
      <Footer />
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkDetails;
