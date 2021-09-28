import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsDrinkCard from '../components/IngredientsDrinkCard';
import RecipeContext from '../context/RecipeContext';

function DrinkExploreIngredients() {
  const { setDisplayByingredients, requestDrinksByIngredient } = useContext(RecipeContext);
  const [drinkIngredients, setDrinkIngredients] = useState([]); // variavel que irá armazenar o array com o nome das bebidas após a montagem do componente (conforme useEffect)
  const MAX_NUMBER = 12;

  const requestDrinkIngredients = async () => { // função que faz um fetch para buscar uma lista de ingredientes, retornando um array
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const request = await fetch(url);
    const response = await request.json();
    return response;
  };

  useEffect(() => {
    requestDrinkIngredients()
      .then(({ drinks }) => setDrinkIngredients(drinks));
    return () => setDisplayByingredients(true); // equivale ao componentWillUnMount e muda o estado displayByIngredients para true
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" search={ false } />
      {drinkIngredients.map((el, i) => {
        if (i < MAX_NUMBER) {
          return (

            <IngredientsDrinkCard
              //  componente que renderiza cada card de comidas (imagem e nome)
              key={ i }
              ingredient={ el.strIngredient1 }
              index={ i }
              onClick={ () => requestDrinksByIngredient(i, el.strIngredient1) }
            />

          );
        }
        return '';
      })}
      <Footer />
    </div>
  );
}

export default DrinkExploreIngredients;
