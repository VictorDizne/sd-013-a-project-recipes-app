import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
// import copy from 'clipboard-copy';
import { fetchFoodById, handleCheckBoxChange } from '../services';
// import IngredientsList from '../components/IngredientsList';
import '../css/Detail.css';
import Context from '../Context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodInProgress() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdFoodDetails,
  } = useContext(Context);

  const [foodDetails, setFoodDetails] = useState([]);
  const [heartFavorite, setHeartFavorite] = useState(false);
  const [msgClipboard, setMsgClipboard] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect utilizado para verificar se a receita foi marcada como favorita e colorir o ícone de vermelho.
  useEffect(() => {
    if (
      localStorage.favoriteRecipes
      && JSON.parse(localStorage.favoriteRecipes).find(
        (recipeId) => recipeId.id === id,
      )
    ) {
      setHeartFavorite(true);
    } else {
      setHeartFavorite(false);
    }
  }, [id]); // ATENÇÃO!!! Cuidado ao dependências nesse useEffect com localStorage, sob risco de causar loop.

  const handleFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      setHeartFavorite(true);
      return localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: foodDetails[0].idMeal,
          type: 'comida',
          area: foodDetails[0].strArea,
          category: foodDetails[0].strCategory,
          alcoholicOrNot: '',
          name: foodDetails[0].strMeal,
          image: foodDetails[0].strMealThumb,
        },
      ]));
    }

    if (JSON.parse(localStorage.favoriteRecipes).find(
      (recipeId) => recipeId.id === id,
    )
    ) {
      setHeartFavorite(false);
      return localStorage.setItem('favoriteRecipes', JSON.stringify(
        JSON.parse(localStorage.favoriteRecipes).filter(
          (recipeId) => recipeId.id !== id,
        ),
      ));
    }

    if (
      !JSON.parse(localStorage.favoriteRecipes).find(
        (recipeId) => recipeId.id === id,
      )
    ) {
      setHeartFavorite(true);
      const storageFavorites = JSON.parse(localStorage.favoriteRecipes);
      storageFavorites.push({
        id: foodDetails[0].idMeal,
        type: 'comida',
        area: foodDetails[0].strArea,
        category: foodDetails[0].strCategory,
        alcoholicOrNot: '',
        name: foodDetails[0].strMeal,
        image: foodDetails[0].strMealThumb,
      });
      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(storageFavorites),
      );
    }
  };

  useEffect(() => {
    async function foodById() {
      const getFoodById = await fetchFoodById(id);
      setFoodDetails(getFoodById);
    }
    foodById();
  }, [id]);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [id, setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    history.push(`/comidas/${value}/in-progress`);
  };

  if (!foodDetails || !foodDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

  const shareLink = (url) => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${url}`);
    // copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  return (
    <div>
      <img
        src={ foodDetails[0].strMealThumb }
        alt={ `${foodDetails[0].strMeal} recipe` }
        data-testid="recipe-photo"
        width="400px"
      />
      <h1 data-testid="recipe-title">{foodDetails[0].strMeal}</h1>
      <span data-testid="recipe-category">{ foodDetails[0].strCategory }</span>

      {msgClipboard ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <strong>Link copiado!</strong>
        </div>
      ) : null }

      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ () => shareLink(foodDetails[0].idMeal) }
      >
        <img src={ shareIcon } alt="share link" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        className="favorite-btn"
        onClick={ handleFavorite }
        src="blackHeartIcon whiteHeartIcon"
      >
        {heartFavorite ? (
          <img src={ blackHeartIcon } alt="coracao favoritado" />
        ) : (
          <img src={ whiteHeartIcon } alt="coracao nao favoritado" />
        )}
      </button>
      <h3>Ingredientes</h3>
      <div>
        {Object.keys(foodDetails[0])
          .filter((k) => k.includes('Ingredient'))
          .map((value, idx) => (
            foodDetails[0][value] !== '' && (
              <label
                htmlFor={ idx }
                key={ idx }
                data-testid={ `${idx}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id={ idx }
                  value={ foodDetails[0][value] }
                  onChange={ ({ target }) => handleCheckBoxChange(target) }
                />
                {foodDetails[0][value]}
              </label>
            )
          ))}
      </div>
      <h3>Instruções</h3>
      <p data-testid="instructions">{foodDetails[0].strInstructions}</p>
      <button
        className="start-recipe-button"
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleLink }
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default FoodInProgress;
