import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';

const AreaCard = ({ selectValue }) => {
  const history = useHistory();
  const { area, pageAreas, mealsApi } = useContext(appContext);

  if (pageAreas && selectValue !== 'All') {
    return (
      <div>
        {area.map((meal, index) => (
          <button
            key={ meal.strMeal }
            type="button"
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/bebidas/${meal.idMeal}`) }
          >
            <h3 data-testid={ `${index}-card-name` }>
              {meal.strMeal}
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              width="150px"
            />
          </button>
        ))}
      </div>
    );
  }
  return (
    <div>
      {mealsApi.map((receita, index) => (
        <button
          type="button"
          key={ receita.strMeal }
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/comidas/${receita.idMeal}`) }
        >
          <h3 data-testid={ `${index}-card-name` }>
            {receita.strMeal}
          </h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ receita.strMealThumb }
            alt={ receita.strMeal }
            width="150px"
          />
        </button>
      ))}
    </div>
  );
};

AreaCard.propTypes = {
  selectValue: PropTypes.string.isRequired,
};

export default AreaCard;
