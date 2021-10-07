import React from 'react';
import { Link } from 'react-router-dom';

function ProgressRecipes() {
  return (
    <section>

      <div>
        Progress Recipes
      </div>
      <div>
        <Link to="/receitas-feitas">
          <button
            className="start-recipe"
            data-testid="start-recipe-btn"
            type="button"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </section>

  );
}

export default ProgressRecipes;
