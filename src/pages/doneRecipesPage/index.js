import React, { useState } from 'react';
import DoneDrinkCard from '../../components/doneDrinkCard';
import DoneMealCard from '../../components/doneMealCard';
import Footer from '../../components/footer';
import Header from '../../components/header';

function DoneRecipesPage() {
  const [showMeals, setShowMeals] = useState(true);
  const [showDrinks, setShowDrinks] = useState(true);

  // Primeiro checa se existe alguma receita marcada como feita
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    return (
      <>
        <Header title="Receitas Feitas" />
        <p>Nenhuma receita foi marcada como completa</p>
        <Footer />
      </>
    );
  }
  // Busca a chave de receitas feitas do localStorage
  const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // Filtra apenas as comidas e faz os cartões
  const everyDoneMeal = currentDoneRecipes.filter((recipe) => recipe.type === 'comida');
  function everyMealCard() {
    return everyDoneMeal.map((meal, index) => (
      <DoneMealCard
        key={ index }
        area={ meal.area }
        tags={ meal.tags }
        date={ meal.doneDate }
        cardName={ meal.name }
        index={ index }
        image={ meal.image }
        id={ meal.id }
        category={ meal.strCategory }
      />));
  }
  // Filtra apenas as bebidas
  const everyDoneDrink = currentDoneRecipes.filter((recipe) => recipe.type === 'bebida');
  function everyDrinkCard() {
    return everyDoneDrink.map((drink, index) => (
      <DoneDrinkCard
        key={ index }
        index={ index }
        image={ drink.image }
        name={ drink.name }
        alcoholicOrNot={ drink.alcoholicOrNot }
        doneDate={ drink.doneDate }
        id={ drink.id }
      />
    ));
  }
  // Filtra cards de bebida ou comida ou ambos
  function handleClick(shouldShow) {
    switch (shouldShow) {
    case 'Meals':
      setShowMeals(true);
      setShowDrinks(false);
      break;
    case 'Drinks':
      setShowMeals(false);
      setShowDrinks(true);
      break;
    case 'All':
      setShowMeals(true);
      setShowDrinks(true);
      break;
    default:
      break;
    }
  }
  return (
    <>
      <Header title="Receitas Feitas" />
      <div className="done-recipes-filters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClick('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleClick('Meals') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClick('Drinks') }
        >
          Drinks
        </button>
      </div>
      { showMeals ? everyMealCard() : null }
      { showDrinks ? everyDrinkCard() : null }
      <Footer />
    </>

  );
}

export default DoneRecipesPage;
