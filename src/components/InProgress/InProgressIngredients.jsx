import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function InProgressIngredients({ spec }) {
  const dispatch = useDispatch();
  const inProgRecs = useSelector((state) => state.recipes.inProgressRecipes); // Acessa o objeto das receitas em progresso;
  const recipe = useSelector((state) => state.api.recipe); // Acessa o objeto com as infos da receita;
  const { id } = useParams(); // Pega a ID da receita pela URL;

  const recKeys = Object.keys(recipe); // Gera um array com todas as chaves do objeto da receita;
  const ingredients = recKeys.filter((k) => k.startsWith('strIngredient') && recipe[k]); // Filtra o array das chaves para pegar apenas as chaves de ingredientes;
  const type = spec === 'Meal' ? 'meals' : 'cocktails';
  const typeProg = inProgRecs[type]; // Acessa a chave correta (meals ou cocktails) do objeto de receitas em progresso;

  const [checkedIngs, setCheckedIngs] = useState(typeProg[id] ? [...typeProg[id]] : []); //

  const handleCheck = ({ currentTarget: t }) => {
    if (t.checked) { // Ao checkar, adiciona ao array da receita pelo ID, atualiza o redux e atualiza o estado local;
      typeProg[id] = typeProg[id] ? [...typeProg[id], t.id] : [t.id];
      dispatch({ type: 'UPDATE_PROGRESS', payload: inProgRecs });
      setCheckedIngs((state) => [...state, t.id]);
    } else { // Ao descheckar, filtra o array da receita pelo ID, atualiza o redux e atualiza o estado local;
      typeProg[id] = typeProg[id].filter((ingId) => ingId !== t.id);
      if (!typeProg[id].length) delete typeProg[id];
      dispatch({ type: 'UPDATE_PROGRESS', payload: inProgRecs });
      setCheckedIngs((state) => state.filter((ingId) => ingId !== t.id));
    }
  };

  return (
    <div className="InProgress-ingredients-container">
      <h3>Ingredients</h3>
      <div className="InProgress-ingredient-list">
        {ingredients.map((ing, idx) => ( // Faz um map usando o array de chaves de ingredientes para acessar os ingredientes da receita;
          <label
            key={ recipe[ing] }
            htmlFor={ idx + 1 }
            data-testid={ `${idx}-ingredient-step` }
            className={ checkedIngs.includes(`${idx + 1}`) ? 'ing-checked' : '' } // Verifica se está no estado local. se for verdadeiro, adiciona a classe que coloca line-through
          >
            <input
              type="checkbox"
              name={ recipe[ing] }
              id={ idx + 1 }
              value={ recipe[ing] }
              checked={ checkedIngs.includes(`${idx + 1}`) } // Input controlado pelo estado local;
              onChange={ handleCheck }
            />
            {`${recipe[ing]} - ${recipe[`strMeasure${idx + 1}`]}`}
          </label>
        ))}
      </div>
    </div>
  );
}

export default InProgressIngredients;

InProgressIngredients.propTypes = {
  spec: PropTypes.string.isRequired,
};
