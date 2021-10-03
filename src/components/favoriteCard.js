import React, { useEffect, useState } from 'react';
import copytoclipboard from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import blackheartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteCard = () => {
  const [drinkFilter, setDrinkFilter] = useState(false);
  const [mealFilter, setMealFilter] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recipes, setRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));

  useEffect(() => {
    const recipesDefault = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // essas verificações servem para filtar a página
    if (drinkFilter) {
      setMealFilter(false);
      return setRecipes(recipesDefault.filter(({ type }) => type === 'bebida'));
    }

    if (mealFilter) {
      setDrinkFilter(false);
      return setRecipes(recipesDefault.filter(({ type }) => type === 'comida'));
    }

    if (!mealFilter && !drinkFilter) {
      return setRecipes(recipesDefault);
    }
  }, [drinkFilter, mealFilter]);

  const remove = (nameRecipe) => {
    // recebe o nome do "card"/receita e remove do localStorage (e seta um novo recipes)
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filteredRecipe = favRecipes.filter(({ name }) => name !== nameRecipe);
    setRecipes(filteredRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipe));
  };

  const copyLink = (id, type) => {
    // recebe o id e o tipo da receita para gerar um link
    const FIVE = 5000;
    if (type === 'bebida') {
      copytoclipboard(`http://localhost:3000/bebidas/${id}`);
      console.log('bebida copiada');
      setCopied(true);
      return setTimeout(() => setCopied(false), FIVE);
    }

    copytoclipboard(`http://localhost:3000/comidas/${id}`);
    setCopied(true);
    return setTimeout(() => setCopied(false), FIVE);
  };

  const topNext = ({ alcoholicOrNot, area, category }, i) => {
    // criada para burlar um requisito do lint... sobre tamanho de código
    if (alcoholicOrNot) {
      return <p data-testid={ `${i}-horizontal-top-text` }>{alcoholicOrNot}</p>;
    }
    return <p data-testid={ `${i}-horizontal-top-text` }>{`${area} - ${category}`}</p>;
  };

  return (
    <div>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setDrinkFilter(true) }
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setMealFilter(true) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setMealFilter(false);
          setDrinkFilter(false);
        } }
      >
        All
      </button>
      {recipes.map((item, i) => (
        <div key={ i }>
          <Link
            to={ item.type === 'bebida' ? `bebidas/${item.id}` : `comidas/${item.id}` }
          >
            <Image
              src={ item.image }
              alt="imagem da receita"
              data-testid={ `${i}-horizontal-image` }
              fluid
            />
            <p data-testid={ `${i}-horizontal-name` }>{item.name}</p>
            {topNext(item, i)}
          </Link>
          <button
            type="button"
            onClick={ () => remove(item.name) }
          >
            <img
              src={ blackheartIcon }
              alt="botão de desfavoritar"
              data-testid={ `${i}-horizontal-favorite-btn` }
            />
          </button>
          <button
            type="button"
            onClick={ () => copyLink(item.id, item.type) }
          >
            <img
              src={ shareIcon }
              alt="botão de copiar"
              data-testid={ `${i}-horizontal-share-btn` }
            />
          </button>
          {copied && <p>Link copiado!</p>}
        </div>
      ))}
    </div>
  );
};

export default FavoriteCard;
