import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context';
import fetchExploreArea from '../services/fetchExploreArea';
import fetchAreaCategories from '../services/fetchAreaCategories';

function ExplorarOrigem() {
  const { filteredMeals, filteredByArea, setFilteredByArea } = useContext(Context);
  const [areaCategories, setAreaCategories] = useState([]);
  const NUM_RECIPES = 12;

  useEffect(() => {
    const getAreaCategories = async () => {
      const results = await fetchAreaCategories();
      setAreaCategories(results);
    };
    getAreaCategories();
  }, []);

  const handleOnChange = ({ target: { value } }) => {
    if (value === 'All') {
      setFilteredByArea(filteredMeals);
    } else {
      const filterByArea = async (area) => {
        const result = await fetchExploreArea(area);
        setFilteredByArea(result);
      };
      filterByArea(value);
    }
  };

  if (!areaCategories || !filteredByArea) return <h1>Loading...</h1>;

  return (
    <div>
      <Header tela="Explorar Origem" />
      <div>
        {' '}
        Selecione um filtro por local de origem:
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => handleOnChange({ target }) }
        >
          <option data-testid="All-option">All</option>
          {areaCategories
            .map((area) => (
              <option
                key={ area.strArea }
                data-testid={ `${area.strArea}-option` }

              >
                {area.strArea}
              </option>
            ))}
        </select>
      </div>
      {filteredByArea
        .filter((_recipe, idx) => idx < NUM_RECIPES)
        .map((recipe, idx) => {
          const id = recipe.idMeal;
          const to = '/comidas/';
          const title = recipe.strMeal;
          const thumb = recipe.strMealThumb;

          return (
            <Link key={ id } to={ `${to}${id}` }>
              <section key={ title } data-testid={ `${idx}-recipe-card` }>
                <h2 data-testid={ `${idx}-card-name` }>{title}</h2>
                <img
                  src={ thumb }
                  data-testid={ `${idx}-card-img` }
                  className="img-fluid"
                  alt={ title }
                />
              </section>
            </Link>
          );
        }) }

      <Footer />
    </div>
  );
}

export default ExplorarOrigem;
