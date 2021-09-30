import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DoneMealCard({ area, tags, date, cardName, index, image, id }) {
  const twoTags = tags
    .map((tagName, tagIndex) => (
      <p
        key={ tagIndex }
        className="tag-name"
        data-testid={ `${tagIndex}-${tagName}-horizontal-tag` }
      >
        { tagName }
      </p>));
  return (
    <Link to={ `/comidas/${id}` }>
      <button className="eachFood" type="button">
        <img
          className="foodImage"
          src={ image }
          alt="Recipe thumbnail"
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>
          { cardName }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { date }
        </p>
        <p>{ area }</p>
        { twoTags }
      </button>
    </Link>
  );
}

DoneMealCard.propTypes = {
  area: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneMealCard;
