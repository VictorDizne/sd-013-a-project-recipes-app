import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

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
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/comidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-by-area"
        to="/explorar/comidas/area"
      >
        Por Local de Origem
      </Link>
      <Link
        data-testid="explore-surprise"
        to={ `/comidas/${comidaID}` }
      >
        Me Surpreenda!
      </Link>
      <ComponentFooter />
    </div>
  );
}

export default ExplorarComidas;
