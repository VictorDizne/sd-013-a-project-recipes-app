import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../../components/General';
import { fetchRandomMeal } from '../../services/API';
import '../../CSS/Explore.css';

function ExploreFoods() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [surprise, setSurprise] = useState(false);

  const surpriseMeal = async () => { // Função executa quando usuário escolhe uma "receita surpresa";
    setSurprise(true); // Altera o conteúdo que é renderizado na página para uma mensagem indicando que está buscando a receita;
    const id = await fetchRandomMeal(dispatch); // Faz o fetch da receita surpresa;
    history.push(`/comidas/${id}`, { surprise: true }); // Redireciona o usuário para a tela de detalhes da receita sorteada;
  };

  if (surprise) return <h3>Escolhendo uma receita para você...</h3>;
  return (
    <>
      <Header title="Explorar Comidas" />
      <div className="explore-btns-container">
        <button // Redireciona o usuário para a tela de explorar comidas por ingredientes;
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button // Redireciona o usuário para a tela de explorar comidas por area de origem;
          type="button"
          data-testid="explore-by-area"
          onClick={ () => history.push('/explorar/comidas/area') }
        >
          Por Local de Origem
        </button>
        <button // Sorteia uma receita aleatoriamente e redireciona o usuário para a tela de detalhes;
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseMeal }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreFoods;
