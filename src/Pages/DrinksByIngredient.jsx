import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import { getDrinkIngredients } from '../services/Api';
import IngredientsCard from '../components/IngredientsCard';

function DrinksByIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const { setFilterIngredients } = useContext(Context);
  const MAX_LENGTH = 12;
  useEffect(() => {
    const getIngredients = async () => {
      const result = await getDrinkIngredients();
      setIngredientsList(result.drinks);
    };
    getIngredients();
  }, []);
  const URL = 'https://www.thecocktaildb.com/images/ingredients/';
  return (
    <div>
      Pagina SearchDrinksIngredients
      <Header title="Explorar Ingredientes" />
      {ingredientsList.map((ingredient, index) => (
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
