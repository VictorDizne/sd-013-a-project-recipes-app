import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components/General';
import { fetchMealIngredients } from '../../services/API';

function ExploreFoodsByIng() {
  const MagicNumber = 12;
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.api.explore);
  useEffect(() => {
    fetchMealIngredients(dispatch);
  }, [dispatch]);
  if (!ingredients) return null;
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredients.slice(0, MagicNumber).map(({ strIngredient }, index) => (
          <Link key={ index } to={ { pathname: '/comidas', state: { strIngredient } } }>
            <section data-testid={ `${index}-ingredient-card` }>
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt="ingredient-thumbnail"
                />
              </div>
              <div>
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient }
                </p>
              </div>
            </section>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoodsByIng;
