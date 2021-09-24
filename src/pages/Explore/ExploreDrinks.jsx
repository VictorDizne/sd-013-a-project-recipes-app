import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../../components/General';
import { fetchRandomDrink } from '../../services/API';
import '../../CSS/Explore.css';

function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [surprise, setSurprise] = useState(false);

  const surpriseDrink = async () => { // Função executa quando usuário escolhe uma "receita surpresa";
    setSurprise(true); // Altera o conteúdo que é renderizado na página para uma mensagem indicando que está buscando a receita;
    const id = await fetchRandomDrink(dispatch); // Faz o fetch da receita surpresa;
    history.push(`/bebidas/${id}`, { from: 'surprise' }); // Redireciona o usuário para a tela de detalhes da receita sorteada;
  };

  if (surprise) return <h3>Escolhendo uma receita para você...</h3>;
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div className="explore-btns-container">
        <button // Redireciona o usuário para a tela de explorar comidas por ingredientes;
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </button>
        <button // Sorteia uma receita aleatoriamente e redireciona o usuário para a tela de detalhes;
          type="button"
          data-testid="explore-surprise"
          onClick={ surpriseDrink }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
