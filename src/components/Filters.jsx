import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MyContext from '../context/myContext';

const Filters = ({ alimento }) => {
  const { setBtnState } = useContext(MyContext);
  const FIVE = 5;
  const fifthFirst = alimento.slice(0, FIVE);

  const handleClick = ({ target }) => {
    const { name } = target;
    setBtnState({
      category: name,
    });
  };

  if (alimento.length === 0) return (<Loading />);

  return (
    <div>
      { fifthFirst.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          name={ strCategory }
          onClick={ handleClick }
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
