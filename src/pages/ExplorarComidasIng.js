import React, { useState, useEffect } from 'react';
// import appContext from '../redux/appcontext';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';

const ExplorarComidasIng = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fecthFilters() {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const result = await fetch(endpoint).then((res) => res.json());
      const slicedResult = result.meals.slice(0, Number('12'));
      setIngredients(slicedResult);
      console.log(ingredients);
    }
    fecthFilters();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      <Footer />
    </div>
  );

  /* return (
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
  ); */
};

export default ExplorarComidasIng;
