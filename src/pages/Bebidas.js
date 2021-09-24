import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';
import fetchDrinksFilterCategories from '../services/fetchDrinksFilterCategories';

const NUM_DRINKS = 12;
const NUM_FIVE = 5;

function Bebidas() {
  const { drinks, setDrinks, drinksCategories,
    setDrinksCategories, setFilteredDrinks, filteredDrinks } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);
  const [toggleOn, setToggleOn] = useState('');

  useEffect(() => {
    const getDrinks = async () => {
      const results = await fetchDrinks();
      setDrinks(results);
      setFilteredDrinks(results);
    };
    getDrinks();

    const getDrinksCategories = async () => {
      const results = await fetchDrinksCategories();
      setDrinksCategories(results);
    };
    getDrinksCategories();
    setIsLoading(false);
  }, [setDrinks, setDrinksCategories]);

  const filteredByCategory = async (category) => {
    const selected = category;
    const results = await fetchDrinksFilterCategories(category);
    if(toggleOn === selected) {
      setFilteredDrinks(drinks);
    } else {
      setToggleOn(selected);
      setFilteredDrinks(results);
    }
  };

  const handleOnClick = (category) => {
    filteredByCategory(category);
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <nav>
        {drinksCategories.filter((cat, idx) => idx < NUM_FIVE)
          .map(({ strCategory }) => (
            <button
              data-testid={ `${strCategory}-category-filter` }
              key={ strCategory }
              type="button"
              onClick={ () => handleOnClick(strCategory) }
            >
              {strCategory}
            </button>
          ))}
      </nav>
      <Header />
      <h1>Bebidas</h1>

      {filteredDrinks.filter((drink, idx) => idx < NUM_DRINKS).map((drink, idx) => (
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
