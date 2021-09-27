import React, { useEffect } from 'react';
import { useDebugState } from 'use-named-state';
import { Link } from 'react-router-dom';
import Header from '../components/ComponentHeader';
import ComponentFooter from '../components/ComponentFooter';

function ExplorarBebidas() {
  const [bebidaID, setBebidaID] = useDebugState('bebidaID', 0);

  useEffect(() => {
    async function fetchData() {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const fetchApi = await fetch(URL);
      const data = await fetchApi.json();
      setBebidaID(data.drinks[0].idDrink);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" hideSearch hideProfile={ false } />
      <Link
        data-testid="explore-by-ingredient"
        to="/explorar/bebidas/ingredientes"
      >
        Por Ingredientes
      </Link>
      <Link
        data-testid="explore-surprise"
        to={ `/bebidas/${bebidaID}` }
      >
        Me Surpreenda!
      </Link>
      <ComponentFooter />
    </div>
  );
}

export default ExplorarBebidas;
