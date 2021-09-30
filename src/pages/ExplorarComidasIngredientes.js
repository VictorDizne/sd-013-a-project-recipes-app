import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import CardIngredient from '../components/CardIngredient';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarComidasIngredientes({ history }) {
  const isTrue = true;
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const MAXINGREDIENTS = 12;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      const IngredientArray = data.meals.slice(0, MAXINGREDIENTS);
      setIngredients(IngredientArray);
    };
    fetchIngredients();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Ingredientes" history={ history } isMeal />

      {ingredients.map(({ idIngredient, strIngredient }, index) => (
        <CardIngredient
          key={ idIngredient }
          index={ index }
          isMeal={ isTrue }
          IngredientName={ strIngredient }
        />
      ))}

      <Footer />

    </>
  );
}

ExplorarComidasIngredientes.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
