import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Context from '../ContextAPI/Context';

export default function ExploreFoodByIngredients() {
  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };
  const [ingredients, setIngredients] = useState([]);
  const { setExploreData } = useContext(Context);
  // const setRecipesDb = useContext(RecipesContext);
  const history = useHistory();
  const limits = 12;

  useEffect(() => {
    const getIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        .then((res) => res.json());
      setIngredients(response.meals);
    };
    getIngredients();
  }, []);

  async function getMealFromIngredient(param) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`);
    const data = await response.json();
    // setRecipesDb([]);
    return setExploreData(data.meals);
  }

  return (
    <div>
      <Header value={ pageTitle } />
      {
        ingredients.map((meal, index) => (
          (index < limits) && (
            <button
              name={ meal.strIngredient }
              type="button"
              onClick={ async () => {
                await getMealFromIngredient(meal.strIngredient);
                return history.push('/comidas');
              } }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <img
                  name={ meal.strIngredient1 }
                  src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt={ meal.strIngredient }
                />
              </div>
              <div
                name={ meal.strIngredient }
              >
                <span
                  data-testid={ `${index}-card-name` }
                >
                  { meal.strIngredient }
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
