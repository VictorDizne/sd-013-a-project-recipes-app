import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import useFetch from '../hooks/useFetch';
import './details.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from '../components/Carousel';
import StartButton from '../components/StartButton';
import Share from '../components/Share';
import Favorite from '../components/Favorite';

function Details({ match: { params: { id, type } } }) {
  const { searchBar: { query, endpoint } } = useContext(MyContext);
  const { meals } = useFetch(query, endpoint, true);
  const getMeal = meals ? Object.values(meals)
    .find((meal) => meal.idMeal === id) : [];

  const [key, keysId, fetchMeals] = (type === 'comidas')
    ? ['drinks', 'Drink'] : ['meals', 'Meal', true];

  const data = useFetch('', '', fetchMeals);

  const SIX = 6;
  if (data[key] && data[key].length > 2) {
    const recomendations = data[key].slice(0, SIX);
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
          <Share id={ id } type={ type } />
          <Favorite id={ id } type={ type } />
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
          <Carousel recomendations={ recomendations } keys={ keysId } />
          <StartButton type={ type } id={ id } />
        </article>
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
