import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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
  return (
    <div>
      <Header tela="Receitas Feitas" showSearch={ false } />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      </div>
      <div>
        {
          doneRecipes.map(({ image, tags }, index) => (
            <div key={ index }>
              <img
                src={ image }
                alt="Imagem Horizontal"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>Blablabla</p>
              <p data-testid={ `${index}-horizontal-name` }>Blablabla</p>
              <p data-testid={ `${index}-horizontal-done-date` }>Blablabla</p>
              <p data-testid={ `${index}-horizontal-share-btn` }>Blablabla</p>
              <input
                data-testid={ `${index}-horizontal-share-btn` }
                type="image"
                alt="Ícone de compartilhar"
                src={ shareIcon }
              />
              <div>
                {
                  tags.map((tag, i) => (
                    <p
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                      key={ i }
                    >
                      {tag}
                    </p>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReceitasFeitas;
