import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

export default function DrinksExplorer() {
  const pageTitle = {
    pageName: 'Explorar Bebidas',
    setIcon: false,
  };
  const [surpriseDrink, setSurpriseDrink] = useState(0);

  useEffect(() => {
    const getDrink = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json());
      return setSurpriseDrink(response.drinks[0].idDrink);
    };
    getDrink();
  }, []);
  const randomId = surpriseDrink;

  function surprise() {
    return (
      <div>
        <Link to={ `/bebidas/${randomId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda!"
          >
            Me Surpreenda!
          </button>

        </Link>
        <span> carregando...</span>
      </div>
    );
  }

  return (
    <div>
      <Header value={ pageTitle } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          name="Por Ingredientes"
        >
          Por Ingredientes
        </button>
      </Link>
      {
        surprise()
      }
      <Footer />
    </div>
  );
}
