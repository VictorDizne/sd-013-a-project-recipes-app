import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';

const NUM_DRINKS = 12;
const NUM_FIVE = 5;

function Bebidas() {
  const { drinks, setDrinks, drinksCategories, setDrinksCategories } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDrinks = async () => {
      const results = await fetchDrinks();
      setDrinks(results);
    };
    getDrinks();

    const getDrinksCategories = async () => {
      const results = await fetchDrinksCategories();
      setDrinksCategories(results);
    };
    getDrinksCategories();
    setIsLoading(false);
  }, [setDrinks, setDrinksCategories]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <nav>
        {drinksCategories.filter((cat, idx) => idx < 5).map(({ strCategory }) => (
          <button data-testid={ `${strCategory}-category-filter` } key={ strCategory } type="button">{strCategory}</button>
        ))}
      </nav>
      <Header />
      <h1>Bebidas</h1>

      {drinks.filter((drink, idx) => idx < NUM_DRINKS).map((drink, idx) => (
        <section key={ drink.strDrink } data-testid={ `${idx}-recipe-card` }>
          <h2 data-testid={ `${idx}-card-name` }>{drink.strDrink}</h2>
          <img
            src={ drink.strDrinkThumb }
            data-testid={ `${idx}-card-img` }
            alt={ drink.strDrink }
          />
        </section>
      ))}
      <Footer />
    </>
  );
}

export default Bebidas;
