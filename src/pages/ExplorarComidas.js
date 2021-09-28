import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function ExplorarComidas() {
  const history = useHistory();

  const fetchAPI = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const { meals } = await fetch(url).then((response) => response.json());
    return meals;
  };

  const handleClick = async () => {
    const fetchResult = await fetchAPI();
    history.push(`/comidas/${fetchResult[0].idMeal}`);
  };

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
        {/* <Link to="/comidas"> */}
        <button
          type="submit"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
        {/* </Link> */}
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
