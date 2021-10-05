import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MasterCard from '../components/MasterCard';
import { fetchIngredients } from '../services/fetchRecipes';

import Main from './styles/MainPage';
import CardList from './styles/CardList';

const DrinksByIngredients = () => {
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    const fetchStorageIngredientes = async () => {
      setIngredients(await fetchIngredients('bebidas'));
    };
    fetchStorageIngredientes();
  }, []);

  const ingredientImage = (ingredientName) => {
    const DRINK_INGREDIENT_IMAGES = 'https://www.thecocktaildb.com/images/ingredients/';
    return `${DRINK_INGREDIENT_IMAGES}${ingredientName}-Small.png`;
  };
  return (
    <Main>

      <Header title="Explorar Ingredientes" />

      <CardList>
        {
          ingredients ? ingredients.map((ingredient, index) => (
            <Link
              key={ `${ingredient.strIngredient1}${index}` }
              to={ ({
                pathname: '/bebidas',
                state: ingredient.strIngredient1,
              }) }
            >
              <MasterCard
                cardType="ingredient"
                index={ index }
                title={ ingredient.strIngredient1 }
                src={ ingredientImage(ingredient.strIngredient1) }
              />
            </Link>
          )) : <p>loading...</p>
        }
      </CardList>

      <Footer />

    </Main>
  );
};

export default DrinksByIngredients;
