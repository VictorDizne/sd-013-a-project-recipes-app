import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import { fetchSurpriseMe } from '../services/fetchs';

function FoodExplorer() {
  const [idRandom, setIdRandom] = useState();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const randomMeal = await fetchSurpriseMe('themealdb');
      setIdRandom(randomMeal[0].idMeal);
    };
    getData();
  }, []);
  return (
    <section>
      <Header name="Explorar Comidas" search={ false } />
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
        onClick={ () => history.push(`/comidas/${idRandom}`) }
      >
        Me Surpreenda!
      </button>
      <LowerMenu />
    </section>
  );
}

export default FoodExplorer;
