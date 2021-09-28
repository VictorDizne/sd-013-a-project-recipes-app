import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <div>
        <button
          onClick={ () => filterType() }
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => filterType('comida') }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          onClick={ () => filterType('bebida') }
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </div>
      <div>
        {
          recipes
            .map(({
              image, area, category, name, tags, doneDate, type, alcoholicOrNot, id,
            }, index) => (
              <div key={ index }>
                <Link to={ `./${type}s/${id}` }>
                  <input
                    width="300px"
                    src={ image }
                    type="image"
                    alt="Imagem Horizontal"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { type === 'bebida' ? alcoholicOrNot : `${area} - ${category}`}
                </p>
                <Link to={ `./${type}s/${id}` }>
                  <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
                </Link>
                <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
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
