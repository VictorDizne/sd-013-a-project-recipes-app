import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MyContext from '../context/myContext';

const Filters = ({ alimento }) => {
  const { setBtnState, setIsFiltered, btnState } = useContext(MyContext);
  const FIVE = 5;
  const fifthFirst = alimento.slice(0, FIVE);

  const handleClick = ({ target }) => {
    const { name } = target;
    if (btnState.category !== name) {
      setBtnState({
        category: name,
      });
      setIsFiltered(true);
    } else {
      setBtnState({
        category: 'all',
      });
      setIsFiltered(false);
    }
  };

  if (alimento.length === 0) return (<Loading />);

  return (
    <div>
      <button
        name="all"
        data-testid="All-category-filter"
        type="button"
        onClick={ handleClick }
      >
        All
      </button>
      { fifthFirst.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          name={ strCategory }
          onClick={ handleClick }
          data-testid={ `${strCategory}-category-filter` }
          value={ strCategory }
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
