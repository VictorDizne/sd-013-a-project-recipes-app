import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import recipesContext from '../context';
import RecipeCard from './recipeCard';

function EveryRecipeCard({ title }) {
  const { cardsToShow } = useContext(recipesContext);
  const maxResults = 12;
  const history = useHistory();
  let mealsOrDrink;
  let card;
  // Primeiro checa se a devemos checar por drinks ou comidas
  if (title === 'Comidas' || title === 'Explorar Origem') {
    mealsOrDrink = 'meals';
  } else {
    mealsOrDrink = 'drinks';
  }
  // Depois checa se foi encontrado algum resultado na pesquisa
  if (cardsToShow[mealsOrDrink] === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    card = <p>Nenhum resultado encontrado</p>;
  } else {
    const resultsLenght = Object.keys(cardsToShow[mealsOrDrink]).length;
    // Se o resultado for maior que um, mostra todos os 12 primeiros
    // cards, caso contrário redireciona para os detalhes do único resultado
    if (resultsLenght > 1) {
      const everyRecipe = Object.values(cardsToShow[mealsOrDrink]).slice(0, maxResults);
      card = everyRecipe
        .map((recipe, index) => (
          <RecipeCard
            recipe={ recipe }
            key={ index }
            title={ title }
            index={ index }
            data-testid={ `${index}-recipe-card` }
          />));
    } else if (resultsLenght === 1) {
      // Checa se estamos verificando bebidas ou comidas e redireciona para o endereço
      // do único resultado
      if (mealsOrDrink === 'meals') {
        history.push(`/comidas/${cardsToShow.meals[0].idMeal}`);
      } else {
        history.push(`/bebidas/${cardsToShow.drinks[0].idMeal}`);
      }
    }
  }
  return (
    <div>
      { card }
    </div>
  );
}

EveryRecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EveryRecipeCard;
