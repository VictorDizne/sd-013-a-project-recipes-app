import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';
import SingleCard from '../../components/singleCard';

function FoodIngredients() {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientsMeal = await response.json();
      const maxNumber = 12;
      console.log(Object.values(ingredientsMeal.meals).slice(0, maxNumber));
      setIngredients(Object.values(ingredientsMeal.meals).slice(0, maxNumber));
      setLoading(false);
    }
    fetchIngredients();
  }, []);

  function showCard() {
    const ingredientMap = ingredients.map((ingredient, index) => (
      <Link key={ index } to="/comidas">
        <SingleCard
          data-testid={ `${index}-ingredient-card` }
          cardName={ ingredient.strIngredient }
          index={ index }
          imgsrc={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
        />
      </Link>
    ));
    return ingredientMap;
  }
  return (
    <>
      <Header title="Explorar ingredientes" />
      { loading ? <p>CARREGANDO...</p> : showCard() }
      <Footer />
    </>
  );
}
export default FoodIngredients;
