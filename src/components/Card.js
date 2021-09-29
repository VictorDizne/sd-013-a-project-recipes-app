import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Card({ index, recipeImage, recipeName, link }) {
  const history = useHistory();
  const goToRecipeDetails = () => {
    history.push(link);
  };

  return (

    <button
      type="button"
      onClick={ goToRecipeDetails }
      data-testid={ `${index}-recipe-card` }
    >

      <div className="recipe-card">
        <img
          src={ recipeImage }
          alt={ recipeName }
          data-testid={ `${index}-card-img` }
          style={ { width: '100vw', maxWidth: '500px' } }
        />

        <div data-testid={ `${index}-card-name` }>
          {recipeName}
        </div>
      </div>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipeImage: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
