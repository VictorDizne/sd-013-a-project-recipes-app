import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MealInProgressCard from '../../components/mealInProgressCard';
import recipesContext from '../../context';

function MealInProgress() {
  const { details, medida, ingredientes } = useContext(recipesContext);
  const history = useHistory();
  const id = useParams();
  const saveThisRecipe = () => {
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
      // Casoc contrário, adiciona a comida atual na chave do LocalStorage
      localStorage.setItem('doneRecipes', JSON.stringify([newMeal]));
    }
    // Por último, redireciona o usuário para a página de receitas finalizadas
    history.push('/receitas-feitas');
  };
  return (
    <>
      <MealInProgressCard
        info={ details }
        medidas={ medida }
        ingredientes={ ingredientes }
        id={ id }
      />
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
