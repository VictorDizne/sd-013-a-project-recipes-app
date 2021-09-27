import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import useFetch from '../hooks/useFetch';
import './details.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Details({ history: { location: { pathname } } }) {
  const { searchBar: { query, endpoint } } = useContext(MyContext);
  const { meals } = useFetch(query, endpoint, true);
  const { drinks } = useFetch(query, endpoint, false);
  const magicNumber = 9;
  const getMeal = meals ? Object.values(meals)
    .find((meal) => meal.idMeal === pathname.substr(magicNumber)) : [];
  console.log(getMeal);
  const getDrinks = drinks ? Object.values(drinks).filter((drink, i) => i < 2) : [];
  // const {
  //   strMealThumb,
  //   strMeal,
  //   strCategory,
  //   strInstructions,
  //   strYoutube,
  // } = getMeal;
  if (getMail.length === 0) return <h1>Loading</h1>;
  return (
    <>
      <img
        src={ getMeal.strMealThumb }
        data-testid="recipe-photo"
        className="thumb-details"
        alt={ getMeal.strMeal }
      />
      <div className="div-details-title">
        <div>
          <h2 data-testid="recipe-title">{ getMeal.strMeal }</h2>
        </div>
        <div>
          <button type="button" data-testid="share-btn" className="icons">
            <img src={ shareIcon } alt="share" />
          </button>
          <button type="button" data-testid="favorite-btn" className="icons">
            <img src={ whiteHeartIcon } alt="favorite" />
          </button>
        </div>
      </div>
      <span data-testid="recipe-category">{ getMeal.strCategory }</span>
      <article>
        <h4>Ingredients</h4>
        <ol>
          { Object.keys(getMeal)
            .filter((meal) => meal.includes('Ingredient'))
            .map((meal, i) => (
              getMeal[meal] !== '' ? (
                <li
                  key={ i }
                  data-testid={ `${i}-ingredient-name-and-measure` }
                >
                  { `${getMeal[meal]} - ${getMeal[`strMeasure${i + 1}`]}` }
                </li>) : undefined))}
        </ol>
        <article data-testid="instructions" className="instructions">
          <h4>Instructions</h4>
          <p>{ getMeal.strInstructions }</p>
        </article>
        <iframe
          data-testid="video"
          src={ getMeal.strYoutube }
          frameBorder="0"
          allow="autoplay; encrypted-media;"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="div-details-recomended">
          { getDrinks.map((drink, i) => (
            <div
              key={ i }
              data-testid={ `${i}-recomendation-card` }
              className="recomendation-card"
            >
              <img
                src={ drink.strDrinkThumb }
                className="recomendation-thumb"
                alt={ drink.strDrink }
              />
              <span>{ drink.strCategory }</span>
              <h4>{ drink.strDrink }</h4>
            </div>)) }
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </article>
    </>
  );
}

Details.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
