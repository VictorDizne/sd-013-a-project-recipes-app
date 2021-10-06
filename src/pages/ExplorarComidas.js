import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';
import './Styles/ExplorarComidas.css';

function ExplorarComidas() {
  const [comidaID, setComidaID] = useDebugState('comidaID', 0);

  useEffect(() => {
    async function fetchData() {
      const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const fetchApi = await fetch(URL);
      const data = await fetchApi.json();
      setComidaID(data.meals[0].idMeal);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas " hideSearch hideProfile={ false } />
      <div className="explorar">
        <div className="container">
          <Link
            className="link"
            data-testid="explore-by-ingredient"
            to="/explorar/comidas/ingredientes"
          >
            Por Ingredientes
          </Link>
        </div>
        <div className="container">
          <Link
            className="link"
            data-testid="explore-by-area"
            to="/explorar/comidas/area"
          >
            Por Local de Origem
          </Link>
        </div>
        <div className="container">
          <Link
            className="link"
            data-testid="explore-surprise"
            to={ `/comidas/${comidaID}` }
          >
            Me Surpreenda!
          </Link>
        </div>
      </div>
      <ComponentFooter />
    </div>
  );
}

export default ExplorarComidas;
