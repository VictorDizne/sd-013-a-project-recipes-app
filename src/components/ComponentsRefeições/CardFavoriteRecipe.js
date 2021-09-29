import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import FavoriteButtonFavoriteRecipes from './FavoriteButtonFavoriteRecipes';
import ShareButton from '../ShareButton';

function CardFavoriteRecipe(props) {
  const { item, index } = props;
  const history = useHistory();
  const { type, area, category, id, name, image, alcoholicOrNot } = item;

  useEffect(() => {
  }, []);

  const onclick = () => {
    if (type === 'comida') {
      history.push(`/comidas/${id}`);
    } else {
      history.push(`/bebidas/${id}`);
    }
  };

  return (
    <div>
      <div className="imageCard-favorites">
        <img
          aria-hidden="true"
          onClick={ onclick }
          data-testid={ `${index}-horizontal-image` }
          width="200px"
          alt={ name }
          src={ image }
        />
      </div>
      <div
        data-testid={ `${index}-horizontal-top-text` }
        className="card-recipes-favorite-category"
      >
        {`${area} - ${category} - ${alcoholicOrNot}` }
      </div>
      <div
        data-testid={ `${index}-horizontal-name` }
        className="card-recipes-favorite-title"
        onClick={ onclick }
        aria-hidden="true"
      >
        { name }
        <FavoriteButtonFavoriteRecipes
          item={ item }
          dataTest={ `${index}-horizontal-favorite-btn` }
        />
        <ShareButton
          location={ history.location }
          id={ id }
          type={ type }
          dataTest={ `${index}-horizontal-share-btn` }
        />
      </div>

    </div>
  );
}

CardFavoriteRecipe.propTypes = {
  item: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFavoriteRecipe;
