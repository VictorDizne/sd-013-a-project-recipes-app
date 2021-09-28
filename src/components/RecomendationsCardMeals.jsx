import React, { useContext } from 'react';
import appContext from '../redux/appcontext';

const RecomendationCardMeals = () => {
  const { mealsApiRecomendationCard } = useContext(appContext);
  return (
    <ul className="scrollMenuRecomendation">
      {mealsApiRecomendationCard.map((receitaRecomendada, index) => (
        <li
          // style={ { whiteSpace: 'nowrap' } }
          data-testid={ `${index}-recomendation-card` }
          key={ receitaRecomendada.strMeal }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>
            {receitaRecomendada.strMeal}
          </h3>
          <img
            src={ receitaRecomendada.strMealThumb }
            alt={ receitaRecomendada.strMeal }
            width="200px"
          />
        </li>
      ))}
    </ul>
  );
};

export default RecomendationCardMeals;
