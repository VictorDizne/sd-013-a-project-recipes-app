import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';

const CardDrink = () => {
  const history = useHistory();
  const { drinkApi, filterDrinkApi, activeSearchbarFilter,
    pageIngredients, fetchIngredients } = useContext(appContext);
  if (activeSearchbarFilter) {
    return null;
  }

  if (pageIngredients) {
    return (
      <div className="containerCardDrink">
        {fetchIngredients.map((drink, index) => (
          <button
            className="cardDrink"
            type="button"
            key={ drink.strDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/bebidas/${drink.idDrink}`) }
          >
            <h3 data-testid={ `${index}-card-name` }>
              {drink.strDrink}
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              width="150px"
            />
          </button>
        ))}
      </div>
    );
  }

  if (filterDrinkApi.length !== 0) {
    console.log(filterDrinkApi);
    return (
      <div className="containerCardDrink">
        {filterDrinkApi.map((receita, index) => (
          <button
            className="cardDrink"
            type="button"
            key={ receita.strDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
          >
            <h3 data-testid={ `${index}-card-name` }>
              {receita.strDrink}
            </h3>
            <img
              data-testid={ `${index}-card-img` }
              src={ receita.strDrinkThumb }
              alt={ receita.strDrink }
              width="150px"
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="containerCardDrink">
      {drinkApi.map((receita, index) => (
        <button
          className="cardDrink"
          key={ receita.strDrink }
          type="button"
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
        >
          <h3 data-testid={ `${index}-card-name` }>
            {receita.strDrink}
          </h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ receita.strDrinkThumb }
            alt={ receita.strDrink }
            width="150px"
          />
        </button>
      ))}
    </div>
  );
};

export default CardDrink;
