import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import Header from '../components/Header';
import RecipeDoneCard from '../components/RecipeDoneCard';

export default function ReceitasFeitas({ history }) {
  const [recipeDone, setRecipeDone] = useState([]);
  const [recipeDoneTemp, setRecipeDoneTemp] = useState([]);

  useEffect(() => {
    const doneRecipes = [
      {
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'bebida',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const lcStorage = localStorage.getItem('doneRecipes');
    if (lcStorage) {
      const doneArray = JSON.parse(lcStorage);
      setRecipeDone(doneArray);
      setRecipeDoneTemp(doneArray);
    }
  }, []);

  const handleFilterBtn = ({ target: { name } }) => {
    if (name === 'all') {
      setRecipeDoneTemp(recipeDone);
    } else {
      const isMeal = name === 'food';
      const filteredRecipes = recipeDone.filter((r) => {
        if (isMeal) {
          return r.type === 'comida';
        }
        return r.type === 'bebida';
      });
      setRecipeDoneTemp(filteredRecipes);
    }
  };

  return (
    <Container maxWidth="sm">
      <Header pageTitle="Receitas Feitas" history={ history } />
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
      {recipeDoneTemp.length > 0 && recipeDoneTemp.map((recipe, index) => {
        console.log(recipe);
        return (<RecipeDoneCard
          recipe={ recipe }
          index={ index }
          key={ index }
          history={ history }
        />);
      })}
    </Container>
  );
}

ReceitasFeitas.propTypes = ({
  history: PropTypes.objectOf(PropTypes.any),
}).isRequired;
