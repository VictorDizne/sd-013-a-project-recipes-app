import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import LowerMenu from '../components/LowerMenu';

function OriginExp() {
  const [options, setOptions] = useState([]);
  const [optionSelected, setOptionSelected] = useState('all');
  const [recipes, setRecipes] = useState([]);
  const TWELVE = 12;

  useEffect(() => {
    const fetchOptions = async () => {
      const fetcher = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const { meals } = await fetcher.json();
      setOptions(meals);
    };
    fetchOptions();

    const fetchFirstRecipe = async () => {
      const fetcher = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await fetcher.json();
      setRecipes(meals);
    };
    fetchFirstRecipe();
  }, []);

  useEffect(() => {
    if (optionSelected === 'all') {
      const fetchAll = async () => {
        const allFetcher = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals } = await allFetcher.json();
        setRecipes(meals);
      };
      fetchAll();
    }

    if (optionSelected !== 'all') {
      const fetchRecipes = async () => {
        const fetcher = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${optionSelected}`);
        const { meals } = await fetcher.json();
        setRecipes(meals);
      };
      fetchRecipes();
    }
  }, [optionSelected]);

  return (
    <div>
      <Header name="Explorar Origem" search />
      <select
        name="areas"
        onChange={ ({ target }) => setOptionSelected(target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option
          value="all"
          data-testid="All-option"
        >
          All
        </option>
        {options.map(({ strArea }, i) => (
          <option
            value={ strArea }
            key={ i }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      <section>
        <Row xs={ 2 } md={ 2 } className="g-4">
          {recipes.slice(0, TWELVE).map(({ strMeal, strMealThumb, idMeal }, i) => (
            <Col key={ i } data-testid={ `${i}-recipe-card` }>
              <Link
                to={ {
                  pathname: `/comidas/${idMeal}`,
                } }
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={ strMealThumb }
                    data-testid={ `${i}-card-img` }
                  />
                  <Card.Body>
                    <Card.Text data-testid={ `${i}-card-name` }>{strMeal}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
      <LowerMenu />
    </div>
  );
}

export default OriginExp;
