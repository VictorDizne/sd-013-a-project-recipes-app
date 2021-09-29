import React from 'react';
import renderWithRouter from './renderWithRouter';
import ButtonFinish from '../components/ButtonFinish';

const exemploObjDetail = {
  idMeal: '52965',
  strMeal: 'Breakfast Potatoes',
  strDrinkAlternate: null,
  strCategory: 'Breakfast',
  strArea: 'Canadian',
  strInstructions: 'Before you do anything, freeze your bacon slices that way',
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

describe('1 - Verifica os testes do componente ButtonFinish', () => {
  test('Verifica se os elementos estão presentes na tela', () => {
    const { getByTestId } = renderWithRouter(<ButtonFinish
      objDetail={ exemploObjDetail }
    />);

    const btnFinishRecipe = getByTestId('finish-recipe-btn');
    expect(btnFinishRecipe).toBeInTheDocument();
  });
});
