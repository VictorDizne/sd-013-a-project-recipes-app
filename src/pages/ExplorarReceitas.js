import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchExploreRandom from '../services/fetchExploreRandom';

function ExplorarReceitas({ match, history }) {
  const [randomRecipe, setRandomRecipe] = useState({});
  const isMeal = /comidas/.test(match.path);

  useEffect(() => {
    const getRecipeRandom = async () => {
      const result = await fetchExploreRandom(isMeal);
      setRandomRecipe(result);
    };
    getRecipeRandom();
  }, [isMeal]);

  const handleClickSurprise = () => {
    if (isMeal) {
      history.push(`/comidas/${randomRecipe.idMeal}`);
    } else {
      history.push(`/bebidas/${randomRecipe.idDrink}`);
    }
  };

  return (
    <div>
      <Header
        tela={ isMeal ? 'Explorar Comidas' : 'Explorar Bebidas' }
        showSearch={ false }
      />
      <Link
        to={ isMeal ? '/explorar/comidas/ingredientes'
          : '/explorar/bebidas/ingredientes' }
      >
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      {
        !isMeal ? '' : (
          <Link to="/explorar/comidas/area">
            <button
              className="areaButton"
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem

            </button>
          </Link>
        )
      }
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ handleClickSurprise }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

ExplorarReceitas.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExplorarReceitas;
