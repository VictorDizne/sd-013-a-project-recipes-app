import React, { useEffect } from 'react';

function ProcessFood() {
  /* localStorage.inProgressRecipes = JSON.stringify({
    cocktails: {
        id-da-bebida: [lista-de-ingredientes-utilizados],
        ...
    },
    meals: {
        id-da-comida: [lista-de-ingredientes-utilizados],
        ...
    }
  }); */
  
const [localState, setLocalState] = useState({cocktails: {
  id-da-bebida: [lista-de-ingredientes-utilizados],
  ...
},
meals: {
  id-da-comida: [lista-de-ingredientes-utilizados],
  ...
}})  
const [disable, setDisable] = useState(true);

  const finishRecipe = () => {
    const allCheckBox = document.querySelectorAll(".checkbox");
    allCheckBox.every((box) => box.checked) ? setDisable(false) : '';
    props.history.push('/receitas-feitas');
  };

  const testStorage = () => {
    const allCheckBox = document.querySelectorAll(".checkbox");
    allCheckBox.forEach((e) => e.checked setLocalState({...localState, }));
    props.history.push('/receitas-feitas');
  };

  const onChangeIngredient = (ingredientName) => {
    const mealsOnProgress = localStorage.inProgressRecipes.meals;
    
  }
  
  return (
    <div>
      <h1>comida em processo</h1>
      <img
        data-testid="recipe-photo"
        src={ meal.img }
        alt=""
      />
      <h2 data-testid="recipe-title">nome da receita </h2>
      {meal.ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient.name }
        >
          { ingredient.name }
          <input
            className="checkbox"
            type="checkbox"
            id={ ingredient.name }
            value={ ingredient.name }
            name="ingredients"
            onChange={ (e) => onChangeIngredient(e.target.value) }
          />
        </label>
      ))}
      <p data-testid="recipe-category">
        {ingredient.intructions}
        {' '}
      </p>
      {VIDEO}
      <button type="button" disabled={disable} onClick={ finishRecipe }>
        Finalizar Receita
      </button>
    </div>
  );
}

export default ProcessFood;
