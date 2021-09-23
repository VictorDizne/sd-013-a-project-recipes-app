import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components/General';
import CardFavoriteRecipes from '../../components/FavoriteRecipes/CardFavoriteRecipes';

function FavoriteRecipes() {
  const FavRecipes = useSelector(({ recipes }) => recipes.favoriteRecipes);
  const [filters, setFilters] = useState('all');
  const [cards, setCards] = useState(FavRecipes);

  useEffect(() => {
    if (filters === 'all') {
      setCards(FavRecipes);
    } else {
      setCards(FavRecipes.filter((recipe) => recipe.type === filters));
    }
  }, [FavRecipes, filters]);

  return (
    <div>
      <div>
        <Header title="Receitas Favoritas" />
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
        <CardFavoriteRecipes cards={ cards } />
      </div>
    </div>
  );
}

export default FavoriteRecipes;
