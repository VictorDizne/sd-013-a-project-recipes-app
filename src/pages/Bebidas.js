import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';
import DrinksList from '../components/DrinksList';
import DrinksCategories from '../components/DrinksCategories';

function Bebidas() {
  const { setDrinks, setDrinksCategories, setFilteredDrinks } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

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
  }, [setDrinks, setDrinksCategories, setFilteredDrinks]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Header />
      <h1>Bebidas</h1>
      <DrinksCategories />
      <DrinksList />
      <Footer />
    </>
  );
}

export default Bebidas;
