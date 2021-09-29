import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Context from '../Context/Context';
import useRecipesSearch from '../Hooks/useRecipesSearch';
import useFetchRecipes from '../Hooks/useFetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const urlDrink = 'thecocktail';
  const { data, recipes, category, setId } = useContext(Context);
  // const [toggle, setToggle] = useState(false);
  const history = useHistory();
  const secondButton = true;
  useFetchRecipes(urlDrink);
  useRecipesSearch(data.search, data.text, urlDrink);

  const renderDrinks = () => {
    const magic = 12;
    if (recipes.drinks === null) {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if (recipes.drinks.length === 1) {
      const id = recipes.drinks[0].idDrink;
      return history.push(`./bebidas/${id}`);
    }
    if (recipes.drinks.length > magic) {
      const cooktail = recipes.drinks.slice(0, magic);
      return cooktail.map((recipe, index) => (
        <Link
          key={ index }
          to={ `/bebidas/${recipe.idDrink}` }
          onClick={ () => setId(recipe.idDrink) }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${index}-card-img` }
              className="drinks"
            />
          </div>
        </Link>
      ));
    }
    return (
      recipes.drinks.map((drink, index) => (
        <Link
          key={ index }
          to={ `/bebidas/${drink.idDrink}` }
          onClick={ () => setId(drink.idDrink) }
        >
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{ drink.strMeal }</h3>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      ))
    );
  };

  const renderButtons = () => {
    if (category.drinks !== undefined) {
      const magic2 = 5;
      const list = category.drinks;
      const listButton = list.slice(0, magic2);
      return listButton.map((button) => (
        <Button
          key={ button.strCategory }
          testID={ `${button.strCategory}-category-filter` }
        >
          {button.strCategory}
        </Button>
      ));
    }
  };

  return (
    <section>
      <Header text="Bebidas" secondButton={ secondButton } />
      <section>
        <Button
          testID="all-category-filter"
        >
          All
        </Button>
        { category !== undefined ? renderButtons() : null}
      </section>
      <h1>Drinks</h1>
      { recipes.drinks !== undefined ? renderDrinks() : null }
      <Footer />
    </section>
  );
}

export default Drinks;
