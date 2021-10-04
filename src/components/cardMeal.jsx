import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';
// import CardDetails from './cardDetails';

const CardMeal = () => {
  const history = useHistory();
  const { mealsApi, filterDrinkApi, activeSearchbarFilter,
    pageIngredients, fetchIngredients } = useContext(appContext);

  if (activeSearchbarFilter) {
    return null;
  }

  if (pageIngredients) {
    return (
      <div className="containerCardMeal">
        {fetchIngredients.map((meal, index) => (
          <button
            className="cardMeal"
            type="button"
            key={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/comidas/${meal.idMeal}`) }
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

  if (filterDrinkApi.length !== 0) {
    return (
      <div className="containerCardMeal">
        {filterDrinkApi.map((receita, index) => (
          <button
            className="cardMeal"
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
  }
  return (
    <div className="containerCardMeal">
      {mealsApi.map((receita, index) => (
        <button
          className="cardMeal"
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

export default CardMeal;
