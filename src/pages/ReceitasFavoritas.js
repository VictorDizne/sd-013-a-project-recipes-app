import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';

export default function ReceitasFavoritas({ history }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteRecipesTemp, setFavoriteRecipesTemp] = useState([]);

  useEffect(() => {
    const favoriteRecipesArr = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesArr));
    const lcStorage = localStorage.getItem('favoriteRecipes');
    if (lcStorage) {
      const doneArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(doneArray);
      setFavoriteRecipesTemp(doneArray);
    }
  }, []);

  const handleFilterBtn = ({ target: { name } }) => {
    if (name === 'all') {
      setFavoriteRecipesTemp(favoriteRecipes);
    } else {
      const isMeal = name === 'food';
      const filteredRecipes = favoriteRecipes.filter((r) => {
        if (isMeal) {
          return r.type === 'comida';
        }
        return r.type === 'bebida';
      });
      setFavoriteRecipesTemp(filteredRecipes);
    }
  };

  return (
    <Container maxWidth="sm">
      <Header pageTitle="Receitas Favoritas" history={ history } />
      <Button
        startIcon={ <ClearAllIcon /> }
        data-testid="filter-by-all-btn"
        color="primary"
        variant="outlined"
        sx={ { marginRight: 0.5 } }
        onClick={ handleFilterBtn }
        name="all"
      >
        All
      </Button>
      <Button
        variant="outlined"
        data-testid="filter-by-food-btn"
        color="primary"
        sx={ { marginRight: 0.5 } }
        startIcon={ <FoodBankIcon /> }
        onClick={ handleFilterBtn }
        name="food"
      >
        Food
      </Button>
      <Button
        variant="outlined"
        data-testid="filter-by-drink-btn"
        color="primary"
        startIcon={ <LocalBarIcon /> }
        onClick={ handleFilterBtn }
        name="drink"
      >
        Drink
      </Button>
      {favoriteRecipesTemp.length > 0 && favoriteRecipesTemp.map((recipe, index) => {
        console.log(recipe);
        return (<RecipeDoneCard
          recipe={ recipe }
          index={ index }
          key={ index }
          history={ history }
          shouldHaveFavorite
        />);
      })}
    </Container>
  );
}

ReceitasFavoritas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
