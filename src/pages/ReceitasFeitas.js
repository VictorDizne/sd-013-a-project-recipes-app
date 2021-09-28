import React, { useState } from 'react';
import Header from '../components/Header';
import FilterTypesButtons from '../components/FilterTypesButtons';
import FilteredCards from '../components/FilteredCards';

const doneRecipes = [
  {
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function ReceitasFeitas() {
  const [recipes, setRecipes] = useState(doneRecipes);

  const filterType = (type) => {
    let newRecipes = doneRecipes;
    if (type === 'comida') {
      newRecipes = doneRecipes.filter((recipe) => recipe.type === type);
      return setRecipes(newRecipes);
    }
    if (type === 'bebida') {
      newRecipes = doneRecipes.filter((recipe) => recipe.type === type);
      return setRecipes(newRecipes);
    }
    return setRecipes(newRecipes);
  };

  return (
    <div>
      <Header tela="Receitas Feitas" showSearch={ false } />
      <FilterTypesButtons filterType={ filterType } />
      <FilteredCards recipes={ recipes } />
    </div>
  );
}

export default ReceitasFeitas;
