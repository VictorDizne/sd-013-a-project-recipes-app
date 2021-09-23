import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';

const CardDrink = () => {
  const history = useHistory();
  const { drinkApi, filterDrinkApi } = useContext(appContext);
  if (filterDrinkApi.length !== 0) {
    console.log(filterDrinkApi);
    return (
      <div>
        {filterDrinkApi.map((receita, index) => (
          <button
            type="button"
            key={ receita.strDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
          >
            <span data-testid={ `${index}-card-name` }>
              {receita.strDrink}
            </span>
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
    <div>
      {drinkApi.map((receita, index) => (
        <button
          key={ receita.strDrink }
          type="button"
          data-testid={ `${index}-recipe-card` }
          onClick={ () => history.push(`/bebidas/${receita.idDrink}`) }
        >
          <span data-testid={ `${index}-card-name` }>
            {receita.strDrink}
          </span>
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
