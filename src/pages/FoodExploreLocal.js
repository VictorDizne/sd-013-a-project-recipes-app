import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodExploreLocal() {
  const [origins, setOrigins] = useState([]);

  const getOrigins = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const response = await request.json();
    return response;
  };

  useEffect(() => {
    getOrigins()
      .then(({ meals }) => setOrigins(meals));
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" />
      <div
        className="origins"
      >
        <label
          htmlFor="origins"
        >
          Origem:
          <select
            id="origins"
            data-testid="explore-by-area-dropdown"
          >
            {origins.map((el, i) => (
              <option
                key={ i }
                data-testid={ `${el.strArea}-option` }
              >
                {el.strArea}
              </option>
            ))}
          </select>
        </label>

      </div>
      <Footer />
    </div>
  );
}

export default FoodExploreLocal;
