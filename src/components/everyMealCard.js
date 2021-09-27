import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context';
import SingleCard from './singleCard';

function EveryMealCard() {
  const { meals: { meals } } = useContext(recipesContext);
  // Checa se foi encontrado algum resultado na pesquisa
  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <p>Nenhum resultado encontrado</p>;
  }
  const maxResults = 12;
  const everyRecipe = Object.values(meals).slice(0, maxResults);
  const everyCard = everyRecipe
    .map((recipe, index) => (
      <div
        className="every-card"
        data-testid={ `${index}-recipe-card` }
        key={ index }
      >
        <Link to={ `/comidas/${recipe.idMeal}` } key={ index }>
          <SingleCard
            imgsrc={ recipe.strMealThumb }
            index={ index }
            cardName={ recipe.strMeal }
            data-testid={ `${index}-recipe-card` }
          />
        </Link>
      </div>));
  return (
    <div className="every-card">
      { everyCard }
    </div>
  );
}

export default EveryMealCard;
