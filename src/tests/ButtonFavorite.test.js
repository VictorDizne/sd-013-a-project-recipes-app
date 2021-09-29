import React from 'react';
import renderWithRouter from './renderWithRouter';
import ButtonFavorite from '../components/ButtonFavorite';

const exemploUrlText = '/comidas/52965';
const exemploId = '52965';

const exemploObjDetail = {
  idMeal: '52965',
  strMeal: 'Breakfast Potatoes',
  strDrinkAlternate: null,
  strCategory: 'Breakfast',
  strArea: 'Canadian',
  strInstructions: 'Before you do anything, freeze your bacon slices that way when you\'re ready to prep, it\'ll be so much easier to chop!\r\nWash the potatoes and cut medium dice into square pieces. To prevent any browning, place the already cut potatoes in a bowl filled with water.\r\nIn the meantime, heat 1-2 tablespoons of oil in a large skillet over medium-high heat. Tilt the skillet so the oil spreads evenly.\r\nOnce the oil is hot, drain the potatoes and add to the skillet. Season with salt, pepper, and Old Bay as needed.\r\nCook for 10 minutes, stirring the potatoes often, until brown. If needed, add a tablespoon more of oil.\r\nChop up the bacon and add to the potatoes. The bacon will start to render and the fat will begin to further cook the potatoes. Toss it up a bit! The bacon will take 5-6 minutes to crisp.\r\nOnce the bacon is cooked, reduce the heat to medium-low, add the minced garlic and toss. Season once more. Add dried or fresh parsley. Control heat as needed.\r\nLet the garlic cook until fragrant, about one minute.\r\nJust before serving, drizzle over the maple syrup and toss. Let that cook another minute, giving the potatoes a caramelized effect.\r\nServe in a warm bowl with a sunny side up egg!',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/1550441882.jpg',
  strTags: 'Breakfast,Brunch,',
  strYoutube: 'https://www.youtube.com/watch?v=BoD0TIO9nE4',
  strIngredient1: 'Potatoes',
  strIngredient2: 'Olive Oil',
  strIngredient3: 'Bacon',
  strIngredient4: 'Garlic Clove',
  strIngredient5: 'Maple Syrup',
  strIngredient6: 'Parsley',
  strIngredient7: 'Salt',
  strIngredient8: 'Pepper',
  strIngredient9: 'Allspice',
  strIngredient10: '',
  strIngredient11: '',
  strIngredient12: '',
  strIngredient13: '',
  strIngredient14: '',
  strIngredient15: '',
  strIngredient16: '',
  strIngredient17: '',
  strIngredient18: '',
  strIngredient19: '',
  strIngredient20: '',
  strMeasure1: '3 Medium',
  strMeasure2: '1 tbs',
  strMeasure3: '2 strips',
  strMeasure4: 'Minced',
  strMeasure5: '1 tbs',
  strMeasure6: 'Garnish',
  strMeasure7: 'Pinch',
  strMeasure8: 'Pinch',
  strMeasure9: 'To taste',
  strMeasure10: ' ',
  strMeasure11: ' ',
  strMeasure12: ' ',
  strMeasure13: ' ',
  strMeasure14: ' ',
  strMeasure15: ' ',
  strMeasure16: ' ',
  strMeasure17: ' ',
  strMeasure18: ' ',
  strMeasure19: ' ',
  strMeasure20: ' ',
  strSource: 'http://www.vodkaandbiscuits.com/2014/03/06/bangin-breakfast-potatoes/',
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

describe('1 - Verifica os testes do componente ButtonFavorite', () => {
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId } = renderWithRouter(<ButtonFavorite
      objDetail={ exemploObjDetail }
      id={ exemploId }
      urlText={ exemploUrlText }
    />);

    const btnFavoriteRecipe = getByTestId('favorite-btn');
    expect(btnFavoriteRecipe).toBeInTheDocument();
  });
});