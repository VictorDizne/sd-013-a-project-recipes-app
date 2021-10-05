import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { getMealIngredients, getMeals } from '../services/Api';
import IngredientsCard from '../components/IngredientsCard';

function FoodByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setFilterIngredients, setMealsValue } = useContext(Context); // necessário adicionar meals para a função handle
  const MAX_LENGTH = 12;
  useEffect(() => {
    const getIngredients = async () => {
      setMealsValue(await getMeals('All'));
      const result = await getMealIngredients();
      setIngredientsList(result.meals);
    };
    getIngredients();
  }, []);

  // const handleIngredientFilter = (ingredient) => {
  //   const mealsIngredients = meals
  //     .map((meal) => (meal.strIngredient1));
  //   const filterIngredient = mealsIngredients
  //     .includes(ingredient);
  //   return filterIngredient;
  // };

  const URL = 'https://www.themealdb.com/images/ingredients/';

  return (
    <div>
      Pagina SearchMealsIngredients
      <Header title="Explorar Ingredientes" />
      {ingredientsList
        // .filter(({ strIngredient1 }) => handleIngredientFilter(strIngredient1))
        .map((ingredient, index) => (
          index < MAX_LENGTH ? (
            <Link
              to="/comidas"
              onClick={ () => setFilterIngredients(ingredient.strIngredient1) }
            >
              <IngredientsCard
                key={ index }
                index={ index }
                ingredientImg={ `${URL}${ingredient.strIngredient}-Small.png` }
                ingredientName={ ingredient.strIngredient }
              />
            </Link>
          ) : (null)
        ))}
      <Footer />
    </div>
  );
}

export default FoodByIngredient;
