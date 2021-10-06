import React, { useEffect, useState } from 'react';
import { fetchAllDrinksIngredients } from '../services/bebidasApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import '../styles/ExplorePages.css';

const MAX_INGREDIENTS = 12;

const DrinksByIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const allIngredients = await fetchAllDrinksIngredients();
    const slice = allIngredients.slice(0, MAX_INGREDIENTS);
    setIngredients(slice);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div className="container">
        { ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ index }
            ingredient={ ingredient }
            idx={ index }
            page="drinks"
          />)) }
      </div>
      <Footer />
    </>
  );
};

export default DrinksByIngredients;
