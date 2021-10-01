import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MasterCard from '../components/MasterCard';
import { fetchIngredients } from '../services/localStorageFunctions';

const FoodsExplorerByIngredient = () => {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    const fetchStorageIngredientes = async () => {
      setIngredients(await fetchIngredients());
    };
    fetchStorageIngredientes();
  }, []);

  const ingredientImage = (ingredientName) => {
    const FOOD_INGREDIENT_IMAGES = 'https://www.themealdb.com/images/ingredients/';
    return `${FOOD_INGREDIENT_IMAGES}${ingredientName}-Small.png`;
  };

  return (
    <main>
      <Header title="Explorar Ingredientes" />
      {
        ingredients ? ingredients.map((ingredient, index) => (
          <Link
            key={ `${ingredient}${index}` }
            to={ ({
              pathname: '/comidas',
              state: ingredient.strIngredient,
            }) }
          >
            <MasterCard
              cardType="ingredient"
              index={ index }
              title={ ingredient.strIngredient }
              src={ () => ingredientImage(ingredient.strIngredient) }
            />
          </Link>
        )) : <p>loading...</p>
      }
      <Footer />
    </main>
  );
};

export default FoodsExplorerByIngredient;
