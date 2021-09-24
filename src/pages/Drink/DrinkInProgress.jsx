import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { InProgressFinishButton, InProgressHeader, InProgressImage,
  InProgressIngredients, InProgressInstructions } from '../../components/InProgress';
import { fetchDrinkById } from '../../services/API';
import '../../CSS/InProgress.css';

function DrinkInProgress() {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.api.recipe);
  const { id } = useParams();

  useEffect(() => { // Faz o fetch caso a pessoa acesse diretamente pela URL (sem passar pela tela de detalhes)
    if (!recipe) {
      fetchDrinkById(id, dispatch);
    }
  }, [dispatch, id, recipe]);

  if (!recipe) return null;
  return (
    <>
      <InProgressImage spec="Drink" />
      <InProgressHeader spec="Drink" />
      <InProgressIngredients spec="Drink" />
      <InProgressInstructions />
      <InProgressFinishButton spec="Drink" />
    </>
  );
}

export default DrinkInProgress;
