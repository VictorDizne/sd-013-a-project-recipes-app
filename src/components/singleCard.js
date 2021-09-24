import React from 'react';
import PropTypes from 'prop-types';

function SingleCard({ imgsrc, cardName, index }) {
  return (
    <div data-test-id={ `${index}-recipe-card` }>
      <button type="button">
        <img
          src={ imgsrc }
          alt="Recipe thumbnail"
          width="150"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>
          { cardName }
        </p>
      </button>
    </div>
  );
}

SingleCard.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default SingleCard;
