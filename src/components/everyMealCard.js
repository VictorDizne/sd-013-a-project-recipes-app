import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context';
import MealCard from './MealCard';

function EveryMealCard() {
  const { meals } = useContext(recipesContext);
  const maxResults = 12;
  const history = useHistory();
  let card;
  console.log(meals);
  // Checa se foi encontrado algum resultado na pesquisa
  if (meals.meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    card = <p>Nenhum resultado encontrado</p>;
  } else {
    const resultsLenght = Object.keys(meals.meals).length;
    // Se o resultado for maior que um, mostra todos os 12 primeiros
    // cards, caso contrário redireciona para os detalhes do único resultado
    if (resultsLenght > 1) {
      const everyRecipe = Object.values(meals.meals).slice(0, maxResults);
      card = everyRecipe
        .map((recipe, index) => (
          <MealCard
            recipe={ recipe }
            key={ index }
            index={ index }
            data-testid={ `${index}-recipe-card` }
          />));
    } else if (resultsLenght === 1) {
      history.push(`/comidas/${meals.meals[0].idMeal}`);
    }
  }
  return (
    <div>
      { card }
    </div>
  );
}

export default EveryMealCard;
