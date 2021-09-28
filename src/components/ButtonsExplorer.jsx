import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonsExplorer = ({ page }) => {
  // salvando no estado comida ou bebidas
  const [foodOrDrink, setFoodOrDrink] = useState();
  // usando useEffect para primeiro resolver as condicionais e depois aparecer na pagina
  useEffect(() => {
    if (page === 'food') setFoodOrDrink('comidas');
    if (page === 'drink') setFoodOrDrink('bebidas');
  }, [page]);
  // criando uma funçao para ao chamar o botao de origem e futuramente pegar uma receita aleatoria
  const buttonArea = () => (
    <Link
      to="/explorar/comidas/area"
    >
      <button type="button" data-testid="explore-by-area">
        Por Local de Origem
      </button>
    </Link>);

  return (
    <div>
      <Link to={ `/explorar/${foodOrDrink}/ingredientes` }>
        <button type="button" data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      {page === 'food' && buttonArea()}
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button" data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
};

ButtonsExplorer.propTypes = {
  page: PropTypes.string.isRequired,
}.isRequired;

export default ButtonsExplorer;
