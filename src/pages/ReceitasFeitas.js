import React from 'react';
// import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const ReceitasFeitas = () => (
  <div>
    <button type="button" data-testid="filter-by-all-btn">All</button>
    <button type="button" data-testid="filter-by-food-btn">Food</button>
    <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="Spicy Arrabiata Penne" data-testid={ `${0}-horizontal-image` } />
    <p data-testid={ `${0}-horizontal-top-text` }>Vegetarian</p>
    <p data-testid={ `${0}-horizontal-name` }>Spicy Arrabiata Penne</p>
    <p data-testid={ `${0}-horizontal-done-date` }>23/06/2020</p>
    <button
      type="button"
      data-testid={ `${0}-horizontal-share-btn` }
    >
      Compartilhar receita
    </button>
    <select name="" id="">
      <option value="" data-testid={ `${0}-${'Pasta'}-horizontal-tag` }>Pasta</option>
      <option value="" data-testid={ `${0}-${'Curry'}-horizontal-tag` }>Curry</option>
    </select>
    <button type="button" data-testid="filter-by-all-btn">All</button>
    <button type="button" data-testid="filter-by-food-btn">Food</button>
    <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    <img src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg" alt="Aquamarine" data-testid={ `${1}-horizontal-image` } />
    <p data-testid={ `${1}-horizontal-top-text` }>Cocktail</p>
    <p data-testid={ `${1}-horizontal-name` }>Aquamarine</p>
    <p data-testid={ `${1}-horizontal-done-date` }>23/06/2020</p>
    <button
      type="button"
      data-testid={ `${1}-horizontal-share-btn` }
    >
      Compartilhar receita
    </button>
    <select name="" id="">
      <option value="" data-testid={ `${1}-${''}-horizontal-tag` }>{' '}</option>
      <option value="" data-testid={ `${1}-${''}-horizontal-tag` }>{' '}</option>
    </select>
  </div>
);

export default ReceitasFeitas;
