import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components/General';
import { fetchDrinkIngredients } from '../../services/API';

function ExploreDrinksByIng() {
  const MagicNumber = 12;
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.api.explore);
  useEffect(() => {
    fetchDrinkIngredients(dispatch);
  }, [dispatch]);
  if (!ingredients) return null;
  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredients.slice(0, MagicNumber).map(({ strIngredient1 }, index) => (
          <Link key={ index } to={ { pathname: '/bebidas', state: { strIngredient1 } } }>
            <section data-testid={ `${index}-ingredient-card` }>
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt="ingredient-thumbnail"
                />
              </div>
              <div>
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient1 }
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

export default ExploreDrinksByIng;
