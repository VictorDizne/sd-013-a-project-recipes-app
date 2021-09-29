import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { foodAPIRequest, cocktailsAPIRequest } from '../services/APIrequest';
import MyContext from '../context/myContext';

const ExploreIng = ({ tipo }) => {
  const [ingredientes, setIngredientes] = useState([]);
  const { setIngredient } = useContext(MyContext);
  useEffect(() => {
    const fetchIng = async () => {
      const TWELVE = 12;
      const ingFoodRequest = await foodAPIRequest('list', 'i=list');
      const ingDrinkRequest = await cocktailsAPIRequest('list', 'i=list');
      const ing = tipo === 'comidas' ? ingFoodRequest : ingDrinkRequest;
      const twelveIng = ing ? ing.slice(0, TWELVE) : [];
      setIngredientes(twelveIng);
    };
    fetchIng();
  }, []);

  const ingredientTipo = tipo === 'comidas' ? 'strIngredient' : 'strIngredient1';
  const siteAlimento = tipo === 'comidas' ? 'themealdb' : 'thecocktaildb';
  const rota = tipo === 'comidas' ? '/comidas' : '/bebidas';

  return ingredientes.lenght === 0 ? <Loading /> : (
    <Link to={ rota } {console.log('oi')}>
      <div>
        {ingredientes.map((ingredient, index) => (
          <di data-testid={ `${index}-ingredient-card` } key={ index }>
            <img
              alt={ ingredient[ingredientTipo] }
              data-testid={ `${index}-card-img` }
              src={ `https://www.${siteAlimento}.com/images/ingredients/${ingredient[ingredientTipo]}-Small.png` }
            />
            <p data-testid={ `${index}-card-name` }>{ingredient[ingredientTipo]}</p>
        ))}
      </div>
    </Link>
  );
};

ExploreIng.propTypes = {
  tipo: PropTypes.string,
}.isRequired;

export default ExploreIng;
