import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';
import { fetchSurpriseMe } from '../services/fetchs';

function DrinkExplorer() {
  const [idRandom, setIdRandom] = useState();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const randomMeal = await fetchSurpriseMe('thecocktaildb');
      setIdRandom(randomMeal[0].idDrink);
    };
    getData();
  }, []);
  return (
    <section>
      <Header name="Explorar Bebidas" search={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => history.push(`/bebidas/${idRandom}`) }
      >
        Me Surpreenda!
      </button>
      <LowerMenu />
    </section>
  );
}

export default DrinkExplorer;
