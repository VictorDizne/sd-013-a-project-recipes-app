import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function ExplorarComidas() {
  const { meal, setMeal } = useState([]);
  /* const { idMeal } = sortMeal; */

  const fetchAPI = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const { meals } = await fetch(url).then((response) => response.json());
    console.log(meals);
   /*  setMeal(meals); */
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  /* const handleClick = () => {
    setSortMeal(newMeal);
  }; */

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Comidas" />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="submit"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
      </div>
      <div>
        <Link to="/explorar/comidas/area">
          <button type="submit" data-testid="explore-by-area">Por Local de Origem</button>
        </Link>
      </div>
      <div>
        <Link to={ 'comidas/' }>
          <button
            type="submit"
            data-testid="explore-surprise"
            /* onClick={ handleClick } */
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
