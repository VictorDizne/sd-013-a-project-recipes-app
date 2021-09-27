import React, { useContext, useEffect, useState } from "react";
import MyContext from "../context/Context";
import * as myFunc from "../services/api";
import { RecomendedCard } from '../components/'

function FoodDetailsPage({ location }) {
  const { myPage } = useContext(MyContext);
  const [details, setDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuanitity] = useState([]);
  const [recomended, setRecomended ] = useState([]);
  const LIMITER_FOODS = 6;

  const requestDetails = async () => {
    console.log(location.pathname.split('/')[2]);
    const { meals } = await myFunc.fetchRecipesDetails(
      location.pathname.split('/')[2],
      "themealdb"      
    );
    setDetails(meals);
    let array = [];
    let arrayQuantity = [];
    const number = 20;
    for (let index = 1; index < number; index += 1) {
      if (meals[0][`strIngredient${index}`] !== "") {
        array.push(meals[0][`strIngredient${index}`]);
      }
      if (meals[0][`strMeasure${index}`] !== null ) {
        arrayQuantity.push(meals[0][`strMeasure${index}`]);
      }
    }
    setQuanitity(arrayQuantity)
    setIngredients(array);
  };

  const requestRecomended = async () => {
    const { drinks } = await myFunc.fetchRandonRecipes('thecocktaildb');
    setRecomended(drinks);
  }

  const returnCard = (item, index) => (
    <RecomendedCard
      testid={`${index}-recomendation-card`}
      key={ index }
      index={ index }
      thumb="strDrinkThumb"
      name="strDrink"
      id="idDrink"
      route="bebidas"
      data={ item }
    />
  );

  useEffect(() => {
    requestDetails();
    requestRecomended();
  }, []);

  if (!details.length) return <p>Loading...</p>;

  return (
    <div>
      <img
        style={{ width: "50px", height: "50px" }}
        src={details[0].strMealThumb}
        data-testid="recipe-photo"
        alt={details[0].strMeal}
      />

      <h3 data-testid="recipe-title">{details[0].strMeal}</h3>
      <p data-testid="recipe-category">{details[0].strCategory}</p>

      <button type="button" data-testid="share-btn">
        Compartilhar
      </button>
      <button type="button" data-testid="favorite-btn">
        Favorito
      </button>

      <div>
          {ingredients.map((ingredient,index) => ( ingredient !== undefined &&
            <p key={index} data-testid= {`${index}-ingredient-name-and-measure`}>{`-${ingredient} - ${quantity[index]  !== undefined ? quantity[index] : ''}`}</p>))}
      </div>

      <p data-testid="instructions">{details[0].strInstructions}</p>
      { details[0].strVideo !== null &&  <iframe
        src={`https://www.youtube.com/embed/${details[0].strYoutube.split('=')[1]}`}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen
        title='video'
        data-testid='video'
      /> }
      <h3>Recomendadas</h3>
      <div style={ { display: 'flex', flexDirection: 'row', overflowX:'scroll', width: '100%', height: 'auto' } }>
        { recomended !== null && recomended.map((item, index) => (index >= LIMITER_FOODS
          ? null : returnCard(item, index))) }
      </div>
      <button style={{ position: 'fixed', bottom: '0px' }} type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
    </div>
  );
}

export default FoodDetailsPage;
