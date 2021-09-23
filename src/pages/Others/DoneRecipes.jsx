import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components/General';
import CardDoneRecipes from './CardDoneRecipes';

function DoneRecipes() {
  const doneRecipes = useSelector(({ recipes }) => recipes.doneRecipes);
  const [filters, setFilters] = useState('all');
  const [cards, setCards] = useState(doneRecipes);

  useEffect(() => {
    if (filters === 'all') {
      setCards(doneRecipes);
    } else {
      setCards(doneRecipes.filter((recipe) => recipe.type === filters));
    }
  }, [doneRecipes, filters]);

  return (
    <div>
      <div>
        Done Recipes Page
        <Header title="Receitas Feitas" />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilters('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilters('comida') }
          value="comida"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilters('bebida') }
          value="bebida"
        >
          Drinks
        </button>
      </div>
      <div>
        <CardDoneRecipes cards={ cards } />
      </div>
    </div>
  );
}

export default DoneRecipes;
