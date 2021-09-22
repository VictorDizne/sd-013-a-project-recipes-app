import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const Filters = ({ alimento }) => {
  const FIVE = 5;
  const fifthFirst = alimento.slice(0, FIVE);
  if (alimento.length === 0) return (<Loading />);
  return (
    <div>
      { fifthFirst.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
};

Filters.propTypes = {
  alimento: PropTypes.shape({
    length: PropTypes.number,
    slice: PropTypes.func,
  }),
}.isRequired;

export default Filters;
