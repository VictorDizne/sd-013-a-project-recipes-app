import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientCheckBox({ ingredient, index, id }) {
  const [checked, setChecked] = useState();
  useEffect(() => {
    // Checa se o ingrediente está no LocalStorage
    function checkedIngredient() {
    // Busca o LocalStorage
      const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { meals } = currentRecipes;
      // Checa se o ingrediente está presente no array
      setChecked(meals[id].some((currIngredient) => currIngredient === ingredient));
    }
    checkedIngredient();
  }, [id, ingredient]);
  // Adiciona o ingrediente clicado ao LocalStorage
  function setIngredient() {
    // Busca o localStorage que possui as receitas em progresso
    const currentRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // Pega apenas a chave meals das receitas em progresso
    const { meals } = currentRecipes;
    // Se a receita ainda não tiver checkada
    if (!checked) {
      // Seta o check para true, riscando a opção
      setChecked(true);
      // Adiciona o ingrediente utilizado no array correspondente do localStorage
      const newIngredients = [...meals[id], ingredient];
      // Faz o spread das receitas atuais pra não substituir a chave drinks
      const newRecipes = { ...currentRecipes,
        meals: {
          // Faz o spread das chaves em meals pra substituir apenas os ingredientes do id necessário
          ...currentRecipes.meals,
          [id]: newIngredients,
        },
      };
      // Seta o novo array de receitas em progresso no localStorage
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    } else {
      // Seta o check pra false, desmarcando a opção
      setChecked(false);
      // Remove o ingrediente utilizado do array correspondente do localStorage
      const newIngredients = meals[id]
        .filter((currIngredient) => currIngredient !== ingredient);
      // Faz o spread das receitas atuais pra não substituir a chave drinks
      const newRecipes = { ...currentRecipes,
        meals: {
          // Faz o spread das chaves em meals pra substituir apenas os ingredientes do id necessário
          ...currentRecipes.meals,
          [id]: newIngredients,
        },
      };
      // Seta o novo array de receitas em progresso no localStorage
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipes));
    }
  }
  return (
    <label
      htmlFor={ ingredient }
      data-testid={ `${index}-ingredient-name-and-measure` }
      className="ingredient-option"
    >
      {/* A classe apenas risca o nome de acordo com o check corresponde */}
      <p className={ checked ? 'checked-ingredient' : null }>{ ingredient }</p>
      <input
        name={ ingredient }
        type="checkbox"
        onClick={ () => setIngredient() }
        checked={ checked }
      />
    </label>
  );
}

IngredientCheckBox.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCheckBox;
