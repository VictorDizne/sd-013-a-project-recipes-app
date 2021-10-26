import React, { useContext } from 'react';
import appContext from '../redux/appcontext';

const RecomendationCardDrinks = () => {
  const { drinkApiRecomendationCard } = useContext(appContext);
  // {console.log(drinkApiRecomendationCard)}
  return (
    <ul className="scrollMenuRecomendation">
      {drinkApiRecomendationCard.map((receitaRecomendada, index) => (
        <li
          // style={ { whiteSpace: 'nowrap' } }
          data-testid={ `${index}-recomendation-card` }
          key={ receitaRecomendada.strDrink }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>
            {receitaRecomendada.strDrink}
          </h3>
          <img
            src={ receitaRecomendada.strDrinkThumb }
            alt={ receitaRecomendada.strDrink }
            width="200px"
          />
        </li>
      ))}
    </ul>
  );
};

export default RecomendationCardDrinks;
