import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipesCards from '../components/RecipesCards';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import recipeAPI from '../services/recipeAPI';
import Loading from '../components/Loading';

const MealRecipePage = () => {
  const {
    recipes,
    categorys,
    searchOrHeader,
    setRecipes,
    setCategorys,
    exploredIngredient,
    setExploredIngredient,
  } = useContext(RecipesContext);
  const sizeListRecipes = 12;
  const sizeListCategorys = 5;
  const [categoriesButtonToggler, setCategoriesButtonToggler] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /** Faz as requisições para mostrar as categorias e as receitas */
  const requestAPI = async () => {
    if (exploredIngredient !== '') {
      const apiResponse = await recipeAPI('ingredients', exploredIngredient, 'meal');
      setRecipes(apiResponse.meals);
    } else {
      const dataMeal = await recipeAPI('name', '', 'meal');
      setRecipes(dataMeal.meals);
    }

    const dataCategorys = await recipeAPI('listCategorys', '', 'meal');
    setCategorys(dataCategorys.meals);
    setCategoriesButtonToggler(dataCategorys.meals.map((category) => (
      {
        category: category.strCategory,
        active: true,
      }
    )));
    setIsLoading(false);
  };

  /** Função que envia a categoria pro provider */
  const handleFilterCategory = async (strCategory) => {
    const toggle = categoriesButtonToggler
      .find(({ category }) => category === strCategory);
    if (toggle.active) {
      const dataFilterMeal = await recipeAPI('category', strCategory, 'meal');
      setRecipes(dataFilterMeal.meals);
      setCategoriesButtonToggler([
        ...[...categoriesButtonToggler].filter(({ category }) => category !== strCategory)
          .map(({ category }) => ({ category, active: true })),
        { category: strCategory, active: false },
      ]);
    } else {
      await requestAPI();
      setCategoriesButtonToggler([
        ...[...categoriesButtonToggler].filter(({ category }) => category !== strCategory)
          .map(({ category }) => ({ category, active: true })),
        { category: strCategory, active: true },
      ]);
    }
  };

  /** Função que mostra todas as receitas */
  const handleClickFilterAll = async () => {
    await requestAPI();
  };

  useEffect(() => {
    requestAPI();

    return () => {
      setExploredIngredient('');
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div>
        <Header pageTitle="Comidas" />
        {searchOrHeader ? <SearchBar /> : '' }
      </div>

      {/** Mostra 5 botões com as primeiras cateforias da requisição */}
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ handleClickFilterAll }
        >
          All
        </button>
        {
          categorys
            .slice(0, sizeListCategorys)
            .map((category, index) => (
              <button
                data-testid={ `${category.strCategory}-category-filter` }
                key={ index }
                type="button"
                onClick={ () => handleFilterCategory(category.strCategory) }
              >
                { category.strCategory }
              </button>
            ))
        }
      </div>
      <h2>
        {exploredIngredient !== '' && `Filtro de ingrediente: ${exploredIngredient}`}
      </h2>
      {/** Renderiza os Cards com as Comidas */}
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {
          recipes
            .slice(0, sizeListRecipes)
            .map((recipe, index) => (
              <Link key={ index } to={ `/comidas/${recipe.idMeal}` }>
                <RecipesCards
                  nameValue={ recipe.strMeal }
                  indexValue={ index }
                  thumbValue={ recipe.strMealThumb }
                />
              </Link>
            ))
        }
      </div>
      <Footer />
    </>
  );
};

export default MealRecipePage;
