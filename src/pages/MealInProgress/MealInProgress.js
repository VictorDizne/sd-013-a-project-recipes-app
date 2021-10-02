import React, { useEffect, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import IngredientCheckBox from '../../components/ingredientCheckBox';
// import MealInProgressCard from '../../components/mealInProgressCard';
import recipesContext from '../../context';
import fetchAPI from '../../services/fetchAPI';
import generatesIngredientList from '../../services/generatesIngredientList';
// import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

// FAZER A LÓGICA DE HABILITAR O BOTÃO DE FINALIZAR APENAS QUANDO TODAS OS INGREDIENTES
// ESTIVEREM MARCADOS

function MealInProgress() {
  const { details } = useContext(recipesContext);
  const [currentMeal, setCurrentMeal] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  // Faz o fetch a partir do id da presente receita assim que a página carrega
  useEffect(() => {
    async function fetchMeal() {
      const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCurrentMeal(meals[0]);
    }
    fetchMeal();
    setLoadingPage(false);
  }, [id]);

  function showIngredients() {
    const ingredients = generatesIngredientList(currentMeal);
    // Faz um map do array gerado acima, criando uma checkbox para cada ingrediente da lista
    return ingredients.map((ingredient, index) => (
      <IngredientCheckBox
        ingredient={ ingredient }
        key={ index }
        index={ index }
        id={ id }
      />
    ));
  }

  function saveThisRecipe() {
    // Cria a chave de data de acordo com o sistema da pessoa usuaria
    const today = new Date();
    const doneDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    // Cria um array de no máximo duas tags
    let tags = null;
    if (details.strTags) {
      tags = details.strTags.split(',').slice(0, 2);
    }
    // Cria o objeto da comida
    const newMeal = {
      id: details.idMeal,
      type: 'comida',
      area: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate,
      tags,
    };
    // Busca a chave do localStorage
    const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // Se já existe algo no localStorage faz o spread do que já tem e adiciona o objeto criado
    // acima por último
    if (currentDoneRecipes) {
      const newDoneRecipes = [...currentDoneRecipes, newMeal];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      // Caso contrário, adiciona a comida atual na chave do LocalStorage
      localStorage.setItem('doneRecipes', JSON.stringify([newMeal]));
    }
    // Por último, redireciona o usuário para a página de receitas finalizadas
    history.push('/receitas-feitas');
  }

  if (loadingPage) return <p>CARREGANDO...</p>;
  return (
    <>
      {/* Título da receita */}
      <h1 data-testid="recipe-title">{ currentMeal.strMeal }</h1>
      {/* Imagem da receita */}
      <img
        className="meal-img"
        src={ currentMeal.strMealThumb }
        data-testid="recipe-photo"
        alt={ `${currentMeal.strMeal} thumbnail` }
      />
      <h3 data-testid="recipe-category">
        Categoria:
        { currentMeal.strCategory }
      </h3>
      <h3>Ingredientes:</h3>
      <div className="ingredients-list">
        { showIngredients() }
      </div>
      <button
        className="finish-recipe"
        onClick={ saveThisRecipe }
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </>
  );
}

export default MealInProgress;
