import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ItemCard from '../components/ItemCard';
import { fetchFoods } from '../services/requests';
import '../styles/itemCard.css';

const Foods = () => {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  const [foodsList, setFoodsList] = useState([]);

  const handleFoodsList = async () => {
    const limit = 12;
    const newFoodsList = await fetchFoods(limit);
    setFoodsList(newFoodsList);
  };

  useEffect(() => {
    handleFoodsList();
  }, []);

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <div className="item-card-container">
        {foodsList.map(({ idMeal, strMeal, strMealThumb }, index) => (<ItemCard
          key={ idMeal }
          id={ index }
          name={ strMeal }
          path={ `comidas/${idMeal}` }
          thumb={ strMealThumb }
        />))}
      </div>
      <Footer />
    </div>
  );
};

export default Foods;
