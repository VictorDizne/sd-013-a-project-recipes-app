import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function FavoriteCard({
  alcoholicOrNot, name, index, image, id, type, area, category, recipe }) {
  const history = useHistory();
  // const location = useLocation();

  const handleClick = () => {
    history.push(`${type}s/${id}`);
  };
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card"
    >
      <input
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        src={ `${image}/preview` }
        className="imgThumb"
        onClick={ handleClick }
        type="image"

      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        {
          type === 'bebida' ? alcoholicOrNot
            : `${area} - ${category}`
        }
      </h4>
      <Link
        to={ `${type}s/${id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </Link>
      <ShareButton
        testid={ `${index}-horizontal-share-btn` }
        type={ `${type}s` }
        id={ id }
      />
      <FavoriteButton
        testid={ `${index}-horizontal-favorite-btn` }
        type={ type }
        id={ id }
        recipe={ recipe }
      />
    </div>
  );
}
export default FavoriteCard;

FavoriteCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  key: PropTypes.number,
}.isRequired;
