import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorerFoods() {
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((r) => r.json())
      .then((rJson) => rJson.meals[0].idMeal)
      .then((id) => localStorage.setItem('idFood', id));
  }, []);

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
        // onClick={ fetchRandom }
        onClick={ () => history.push(`/comidas/${localStorage.getItem('idFood')}`) }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorerFoods;

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
