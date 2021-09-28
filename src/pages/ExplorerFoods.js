import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerFoods() {
  const history = useHistory();
  // const [food, setfood] = useState();

  // async function fetchAPI() {
  //   const response = await fetch('www.themealdb.com/api/json/v1/1/random.php')
  //     .then((data) => data.json())
  //     .then((e) => e.meals.idMeal);
  //   console.log(response);
  //   return response;
  // }

  // useEffect(() => {
  //   fetchAPI().then((resp) => setfood(resp));
  // }, []);

  return (
    <div>
      <Header text="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        // onClick={ () => history.push(`/comidas/${food}`) }

      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;
