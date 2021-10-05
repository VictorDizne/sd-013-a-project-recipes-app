import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import { getMeals, getCategories } from '../services/Api';

function Food() {
  const { meals, setMealsValue } = useContext(Context);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState('All');

  const MAX_FOOD_CARDS = 12;
  const MAX_CATEGORIS = 5;

  useEffect(() => {
    const fetchAPI = async () => {
      setMealsValue(await getMeals(category));
      setCategories(await getCategories('meals'));
    };
    fetchAPI();
  }, [category]);

  const handleFilter = (categorieName) => {
    if (categorieName === category) {
      setCategory('All');
    } else {
      setCategory(categorieName);
    }
  };

  if (meals === null) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  return (
    <div>
      <Header title="Comidas" withSearchButton />
      <h1>Lista de comidas</h1>
      <section className="filter__buttons">
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ () => handleFilter('All') }
        >
          All
        </button>
        {categories && categories.slice(0, MAX_CATEGORIS).map((button, index) => (
          <button
            type="button"
            name={ button.strCategory }
            key={ index }
            data-testid={ `${button.strCategory}-category-filter` }
            onClick={ () => handleFilter(button.strCategory) }
          >
            { button.strCategory }
          </button>
        ))}
      </section>
      {meals && meals.slice(0, MAX_FOOD_CARDS).map((meal, index) => (
        <Link
          to={ `/comidas/${meal.idMeal}` }
          key={ index }
        >
          <Card
            key={ meal.strMeal }
            name={ meal.strMeal }
            image={ meal.strMealThumb }
            index={ index }
          />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default Food;
