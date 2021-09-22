import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RecommendationCard from './RecommendationCard';

const six = 6;

function DetailsRecommendations({ spec }) {
  const recipesList = useSelector((state) => state.api.recipesList);

  if (!recipesList) return null;

  const id = spec === 'Meal' ? 'idDrink' : 'idMeal';

  return (
    <div className="details-recommendations-container">
      <h3>Recommendations</h3>
      <div className="recomendation-cards-outercontainer">
        <div className="recomendation-cards-wrapper">
          <div className="recomendation-cards-innercontainer">
            {recipesList.slice(0, six).map((r, i) => (
              <RecommendationCard key={ r[id] } rec={ r } idx={ i } spec={ spec } />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsRecommendations;

DetailsRecommendations.propTypes = {
  spec: PropTypes.string.isRequired,
};
