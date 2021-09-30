import React, { useState } from 'react';
import DoneRecipeCard from '../../components/doneRecipeCard';
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
  // Filtra apenas as comidas
  const everyDoneMeal = currentDoneRecipes.filter((recipe) => recipe.type === 'comida');
  // Filtra apenas as bebidas
  const everyDoneDrink = currentDoneRecipes.filter((recipe) => recipe.type === 'bebida');
  // Essa função gera os cards de acordo com o filtro do usuário
  function generatesCards(recipes) {
    return recipes.map((recipe, index) => (
      <DoneRecipeCard
        recipe={ recipe }
        index={ index }
        key={ index }
      />
    ));
  }
  // Manda para a função que gera os cards apenas os elementos filtrados
  function showCards() {
    if (showMeals && showDrinks) {
      return generatesCards(currentDoneRecipes);
    } if (showMeals) {
      return generatesCards(everyDoneMeal);
    } if (showDrinks) {
      return generatesCards(everyDoneDrink);
    }
  }
  // Filtra cards de bebida ou comida ou ambos de acordo com o botão clicado
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
      { showCards() }
      <Footer />
    </>

  );
}

export default DoneRecipesPage;
