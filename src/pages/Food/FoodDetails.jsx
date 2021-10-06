import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinksByQuery, fetchMealById } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients,
  DetailsInstructions, DetailsVideo,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';
import './FoodDetails.css';

function FoodDetails() {
  const { id } = useParams(); // Pega o ID da receita na URL;
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => { // Roda na montagem do componente (ou quando o ID mudar);
    fetchMealById(id, dispatch); // Faz o fetch da receita pelo ID;
    fetchDrinksByQuery('s', '', dispatch); // Faz o fetch pra gerar as bebidas recomendadas;
  }, [id, dispatch]);

  if (fetching) return <h3>Buscando detalhes da receita ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;

  return ( // 'spec' serve para sinalizar ao componente se é comida ou bebida;
    <div className="details-food-container">
      <div>
        <DetailsImage spec="Meal" />
      </div>

      <div className="details-food-link">
        <DetailsHeader spec="Meal" />
      </div>

      <div>
        <DetailsIngredients />
      </div>

      <div>
        <DetailsInstructions />
      </div>

      <div>
        <DetailsVideo />
      </div>

      <div>
        <DetailsRecommendations spec="Meal" />
      </div>

      <div>
        <DetailsStartRecipe spec="Meal" />

      </div>
    </div>
  );
}

export default FoodDetails;
