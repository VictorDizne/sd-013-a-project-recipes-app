import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import recipesContext from '../context';
import SingleCard from './singleCard';

function EveryDrinkCard() {
  const { drinks } = useContext(recipesContext);
  const maxResults = 12;
  const history = useHistory();
  let card;
  function DrinkURL(id) {
    const toDetails = {
      pathname: `/bebidas/${id}`,
      id,
    };
    return toDetails;
  }
  // Checa se foi encontrado algum resultado na pesquisa
  if (drinks.drinks === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    card = <p>Nenhum resultado encontrado</p>;
  } else {
    const resultsLenght = Object.keys(drinks.drinks).length;
    // Se o resultado for maior que um, mostra todos os 12 primeiros
    // cards, caso contrário redireciona para os detalhes do único resultado
    if (resultsLenght > 1) {
      const everyRecipe = Object.values(drinks.drinks).slice(0, maxResults);
      card = everyRecipe
        .map((recipe, index) => (
          <Link to={ () => DrinkURL(recipe.idDrink) } key={ index }>
            <SingleCard
              imgsrc={ recipe.strDrinkThumb }
              index={ index }
              cardName={ recipe.strDrink }
              data-testid={ `${index}-recipe-card` }
            />
          </Link>));
    } else if (resultsLenght === 1) {
      history.push(`/bebidas/${drinks.drinks[0].idDrink}`);
    }
  }
  return (
    <div>
      { card }
    </div>
  );
}

export default EveryDrinkCard;
