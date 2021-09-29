import React, { useContext } from 'react';
import recipesContext from '../../context';

function InProgress() {
  const { details /* , medida, ingredientes  */ } = useContext(recipesContext);
  const saveThisRecipe = () => {
    if (localStorage.finishRecipes) {
      const parseVersion = JSON.parse(localStorage.finishRecipes);
      localStorage.finishRecipes = JSON.stringify([...parseVersion, details]);
      return;
    }
    localStorage.finishRecipes = JSON.stringify([details]);
  };
  return (
    <div>
      <button onClick={ saveThisRecipe } type="button">Finalizar</button>
    </div>
  );
}

export default InProgress;
