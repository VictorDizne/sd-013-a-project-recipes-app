import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import RecipesContext from '../Context/RecipesContext';

export default function ExploreByIngredients() {
  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };
  const [ingredients, setIngredients] = useState([]);
  const setRecipesDB = useContext(RecipesContext);
  // const { fetchCategories, fetchAPI } = useContext(Context);
  const history = useHistory();
  const limits = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredients(response.drinks);
    };
    getIngredients();
  }, []);

  async function getDrinksFromIngredients(param) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=${param}`);
    const data = await response.json();
    console.log(data);
    setRecipesDB([]);
    return setRecipesDB(data.drinks);
  }

  return (
    <div>
      <Header value={ pageTitle } />
      {
        ingredients.map((drink, index) => (
          (index < limits) && (
            <button
              name={ drink.stringredient1 }
              type="button"
              onClick={ ({ target }) => {
                getDrinksFromIngredients(target.getAttribute('name'));
                return history.push('/bebidas');
              } }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <img
                  name={ drink.strIngredient1 }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${drink.strIngredient1}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt={ drink.strIngredient1 }
                />
              </div>
              <div
                name={ drink.strIngredient1 }
              >
                <span
                  data-testid={ `${index}-card-name` }
                >
                  { drink.strIngredient1 }
                </span>
              </div>
            </button>
          )
        ))
      }
      <Footer />
    </div>
  );
}
