import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

export default function ExplorarComidasArea({ history }) {
  const [origins, setOrigins] = useState([]);
  const { meals, setMeals, handleBtnClick } = useContext(RecipesContext);

  useEffect(() => {
    const fetchOrigin = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const OriginArray = data.meals;
      setOrigins([{ strArea: 'All' }, ...OriginArray]);
    };
    fetchOrigin();
  }, []);

  const fetchMealsByOrigin = async ({ target: { value } }) => {
    const MAXINGREDIENTS = 12;
    if (value === 'All') {
      handleBtnClick({
        input: '',
        isMeal: true,
        radio: 'Nome',
      });
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const data = await response.json();
      const mealsByOrigin = data.meals.slice(0, MAXINGREDIENTS);
      setMeals(mealsByOrigin);
    }
  };

  return (
    <>
      <Header pageTitle="Explorar Origem" history={ history } />

      <select data-testid="explore-by-area-dropdown" onChange={ fetchMealsByOrigin }>

        {origins.map(({ strArea }) => (
          <option data-testid={ `${strArea}-option` } key={ strArea } value={ strArea }>
            {strArea}
          </option>
        ))}

      </select>

      {
        meals.map((meal, index) => (
          <Card
            key={ meal.idMeal }
            index={ index }
            recipe={ meal }
            recipeImage={ meal.strMealThumb }
            recipeName={ meal.strMeal }
            link={ `/comidas/${meal.idMeal}` }
          />
        ))
      }

      <Footer />
    </>
  );
}

ExplorarComidasArea.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
