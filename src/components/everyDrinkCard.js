import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context';
import DrinkCard from './drinkCard';

function EveryDrinkCard() {
  const { drinks } = useContext(recipesContext);
  const maxResults = 12;
  const history = useHistory();
  let card;
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
          <DrinkCard
            recipe={ recipe }
            key={ index }
            index={ index }
            data-testid={ `${index}-recipe-card` }
          />));
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
