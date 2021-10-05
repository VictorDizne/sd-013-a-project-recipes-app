import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { getDrinkIngredients, getDrinks } from '../services/Api';
import IngredientsCard from '../components/IngredientsCard';

function DrinksByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setFilterIngredients, setDrinksValue } = useContext(Context); // necessário adicionar drinks para a função handleIngredientFilter
  const MAX_LENGTH = 12;
  useEffect(() => {
    const getIngredients = async () => {
      setDrinksValue(await getDrinks('All'));
      const result = await getDrinkIngredients();
      setIngredientsList(result.drinks);
    };
    getIngredients();
  }, []);

  // const handleIngredientFilter = (ingredient) => {
  //   const drinksIngredients = drinks
  //     .map((drink) => (drink.strIngredient1));
  //   const filterIngredient = drinksIngredients
  //     .includes(ingredient);
  //   return filterIngredient;
  // };

  const URL = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      Pagina SearchDrinksIngredients
      <Header title="Explorar Ingredientes" />
      {ingredientsList
        // .filter(({ strIngredient1 }) => handleIngredientFilter(strIngredient1))
        .map((ingredient, index) => (
          index < MAX_LENGTH ? (
            <Link
              to="/bebidas"
              onClick={ () => setFilterIngredients(ingredient.strIngredient1) }
            >
              <IngredientsCard
                key={ index }
                index={ index }
                ingredientImg={ `${URL}${ingredient.strIngredient1}-Small.png` }
                ingredientName={ ingredient.strIngredient1 }
              />
            </Link>
          ) : (null)
        ))}
      <Footer />
    </div>
  );
}

export default DrinksByIngredient;
