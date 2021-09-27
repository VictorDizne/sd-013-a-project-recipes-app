import React from 'react';
import PropTypes from 'prop-types';

function SingleCard({ imgsrc, cardName, index, onclick }) {
  return (
    <button type="button" onClick={ onclick }>
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
  );
}

SingleCard.propTypes = {
  imgsrc: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onclick: PropTypes.func,
};

SingleCard.defaultProps = {
  onclick: () => {},
};

export default SingleCard;
