import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const ExplorarBebidas = () => {
  const history = useHistory();

  const fetchAPI = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const { drinks } = await fetch(url).then((response) => response.json());
    return drinks;
  };

  const handleClick = async () => {
    const fetchResult = await fetchAPI();
    history.push(`/bebidas/${fetchResult[0].idDrink}`);
  };

  return (
    <div>
      <HeaderWithoutSearch page="Explorar Bebidas" />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="submit"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
      </div>
      <div>
        {/* <Link to="/explorar/bebidas/supreendabebidas"> teste */}
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
};

export default ExplorarBebidas;
