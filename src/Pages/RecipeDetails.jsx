import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import RecomendationMap from '../Components/RecomendationMap';
import ButtonRecipe from '../Components/ButtonRecipe';
// import whiteHeartIcon from '../Images/whiteHeartIcon.svg';
// import shareIcon from '../Images/shareIcon.svg';
import useApiId from '../Hooks/useApiId';
import useFetchApi from '../Hooks/useFetchApi';
import youtubeLink from '../services/YoutubeLink';
import '../Styles/btn-down.css';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const { pathname } = useLocation();

  const pathnameCheck = (pathnameParam) => {
    switch (pathnameParam) {
    case `/comidas/${id}`:
      return 'themealdb';
    case `/bebidas/${id}`:
      return 'thecocktaildb';
    default:
      return null;
    }
  };

  const [data, isMeal] = useApiId(pathnameCheck(pathname), id);
  const arrayMeasures = [];
  const arrayIngredients = [];
  const VINTE = 20;

  for (let i = 1; i < VINTE; i += 1) {
    if (data[`strIngredient${i}`] !== null
      && data[`strIngredient${i}`] !== ''
      && data[`strIngredient${i}`] !== undefined) {
      arrayIngredients.push(data[`strIngredient${i}`]);
    }
    if (data[`strMeasure${i}`] !== null
      && data[`strMeasure${i}`] !== ''
      && data[`strMeasure${i}`] !== undefined) {
      arrayMeasures.push(data[`strMeasure${i}`]);
    }
  }

  const pathnameReverse = isMeal
    ? pathnameCheck(`/bebidas/${id}`)
    : pathnameCheck(`/comidas/${id}`);
  const recomendationData = useFetchApi(pathnameReverse);

  return (
    <div>
      <h1>RecipeDetails</h1>

      <div>
        <img
          data-testid="recipe-photo"
          src={ isMeal ? data.strMealThumb : data.strDrinkThumb }
          alt={ isMeal ? 'foto da comida' : 'foto da bebida' }
        />

        <h2 data-testid="recipe-title">{isMeal ? data.strMeal : data.strDrink}</h2>

        {/* <ShareButton />
        <button
          type="button"
          src={ shareIcon }
          alt="compartilhar"
          data-testid="share-btn"
          onClick={}
        /> */}
        {/* <FavoriteButton />
        <button
          type="button"
          src={ whiteHeartIcon }
          alt="favoritar receita"
          data-testid="favorite-btn"
        /> */}

        <h2
          data-testid="recipe-category"
        >
          { isMeal ? data.strCategory : (`${data.strAlcoholic} - ${data.strCategory}`) }
        </h2>
        <ul>
          {arrayIngredients.map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { `${ingredient} - ${arrayMeasures[index]}` }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{data.strInstructions}</p>

        {isMeal && (
          <div data-testid="video">
            <YouTube
              videoId={ youtubeLink(data.strYoutube, pathname) }
            />
          </div>)}

        <RecomendationMap
          itens={ recomendationData }
          pathname={ pathnameReverse }
          isMeal={ isMeal }
        />

        <ButtonRecipe isMeal={ isMeal } id={ id } />
      </div>

    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default RecipeDetails;
