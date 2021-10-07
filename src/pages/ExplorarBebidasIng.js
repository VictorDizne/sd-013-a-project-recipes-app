import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../redux/appcontext';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';

const ExplorarBebidasIng = () => {
  const [ingredientsDrinks, setIngredientsDrinks] = useState([]);
  const { setFetchIngredients, setPageIngredients } = useContext(appContext);
  const history = useHistory();

  async function fecthDrinks() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.drinks.slice(0, Number('12'));
    setIngredientsDrinks(slicedResult);
  }

  useEffect(() => {
    fecthDrinks();
    setPageIngredients(false);
  }, []);

  const handleClick = async (ingredient) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const result = await fetch(endpoint).then((res) => res.json());
    const slicedResult = result.drinks.slice(0, Number('12'));
    setFetchIngredients(slicedResult);
    setPageIngredients(true);
    history.push('/bebidas');
  };

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Ingredientes" />
      { ingredientsDrinks.map((drink, index) => (
        <button
          type="submit"
          key={ index }
          data-testid={ `${index}-ingredient-card` }
          onClick={ () => handleClick(drink.strIngredient1) }
        >
          <h3 data-testid={ `${index}-card-name` }>{ drink.strIngredient1 }</h3>
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
            alt={ drink.strIngredient1 }
          />
        </button>
      )) }
      <Footer />
    </div>
  );
};

export default ExplorarBebidasIng;
