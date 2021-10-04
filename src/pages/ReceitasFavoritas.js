import React, { useState } from 'react';
import Header from '../components/Header';
import FilterTypesButtons from '../components/FilterTypesButtons';
import FilteredCards from '../components/FilteredCards';

/* const favoriteRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
]; */

if (!localStorage.favoriteRecipes) {
  const arrayFavorite = [];
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavorite));
}
const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

function ReceitasFavoritas() {
  const [recipes, setRecipes] = useState(favoriteRecipes);
  // const isMeal = /comidas/.test(match.path);

  console.log(recipes);
  const filterType = (type) => {
    let newRecipes = favoriteRecipes;
    if (type === 'comida') {
      newRecipes = favoriteRecipes.filter((recipe) => recipe.type === type);
      return setRecipes(newRecipes);
    }
    if (type === 'bebida') {
      newRecipes = favoriteRecipes.filter((recipe) => recipe.type === type);
      return setRecipes(newRecipes);
    }
    return setRecipes(newRecipes);
  };

  return (
    <div>
      <Header tela="Receitas Favoritas" showSearch={ false } />
      <FilterTypesButtons filterType={ filterType } />
      <FilteredCards recipes={ recipes } favoriteOrDone="favorite" />
    </div>
  );
}

export default ReceitasFavoritas;
