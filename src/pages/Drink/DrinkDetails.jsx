import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDrinkById, fetchMealsByQuery } from '../../services/API';
import { DetailsImage, DetailsHeader, DetailsIngredients, DetailsInstructions,
  DetailsRecommendations, DetailsStartRecipe } from '../../components/Details';
import '../../CSS/Details.css';

function DrinkDetails() {
  const { id } = useParams(); // pega o ID da receita na URL;
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.api.fetching);
  const error = useSelector((state) => state.api.error);

  useEffect(() => { // Roda na montagem do componente (ou quando o ID mudar);
    fetchDrinkById(id, dispatch); // Faz o fetch da receita pelo ID;
    fetchMealsByQuery('s', '', dispatch); // Faz o fetch pra gerar as comidas recomendadas;
  }, [id, dispatch]);

  if (fetching) return <h3>Buscando detalhes da receitas ...</h3>;
  if (error) return <h3>Hmm, Algo deu errado, por favor tente novamente</h3>;

  return ( // 'spec' serve para sinalizar ao componente se é comida ou bebida;
    // a página é de drink, mas o css é o mesmo para comida e drink
    <div className="details-food-container">
      <div>
        <DetailsImage spec="Drink" />
      </div>

      <div className="details-food-link">
        <DetailsHeader spec="Drink" />
      </div>

      <div>
        <DetailsIngredients />
      </div>

      <div>
        <DetailsInstructions />
      </div>

      <div>
        <DetailsRecommendations spec="Drink" />
      </div>

      <div>
        <DetailsStartRecipe spec="Drink" />

      </div>
    </div>
  );
}

export default DrinkDetails;
