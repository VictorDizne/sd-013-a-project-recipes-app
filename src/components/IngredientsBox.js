import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchIngredients } from '../services';
import IngredientCard from './IngredientCard';

const MAX_INDEX = 12;

function IngredientsBox() {
  const [ingredients, setIngredients] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const initialRender = useRef(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const loadIngredients = async () => {
      const data = await fetchIngredients(pathname);
      setIngredients(data);
    };
    loadIngredients();
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      setIsReady(true);
    } else {
      initialRender.current = true;
    }
  }, [ingredients]);

  return (
    <div>
      {isReady && ingredients
        .slice(0, MAX_INDEX)
        .map((ingredient, index) => (
          <IngredientCard
            index={ index }
            key={ index }
            name={
              pathname.includes('comidas')
                ? ingredient.strIngredient : ingredient.strIngredient1
            }
          />
        ))}
    </div>
  );
}

export default IngredientsBox;
