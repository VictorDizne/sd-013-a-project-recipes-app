import React from 'react';
import Header from '../components/Header';
import { Button } from '../components';
import shareIcon from '../images/shareIcon.svg';

function RecipesDone() {
  const recipesDone = JSON.parse(localStorage.getItem('doneRecipes') || []);
  return (
    <div>
      <Header text="Receitas Feitas" />
      <div>
        <Button testID="filter-by-all-btn">All</Button>
        <Button testID="filter-by-food-btn">Comidas</Button>
        <Button testID="filter-by-drink-btn">Bebidas</Button>
      </div>
      <section>
        {recipesDone.length > 0 ? recipesDone.map((item, i) => (
          <div key={ item.id }>
            <img
              data-testid={ `${i}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
            />
            <div>
              <h4 data-testid={ `${i}-horizontal-top-text` }>{item.name}</h4>
              <h2 data-testid={ `${i}-horizontal-name` }>{ }</h2>
              <p data-testid={ `${i}-horizontal-done-date` }>{ }</p>
              <Button
                testID={ `${i}-horizontal-share-btn` }
              >
                <img src={ shareIcon } alt="compartilhar" />
              </Button>
              {/* {item[tags].length > 0
                ? <p data-testid="" >{item.tags}</p>
                : null} */}
            </div>
          </div>
        )) : <p>Você ainda não concluiu nenhuma receita :(</p>}
      </section>
    </div>
  );
}

export default RecipesDone;
// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   area: area-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]

// Todos os data-testids estão presentes:
// O botão de filtro All deve ter o atributo data-testid="filter-by-all-btn";
// O botão de filtro Food deve ter o atributo data-testid="filter-by-food-btn";
// O botão de Drinks deve ter o atributo data-testid="filter-by-drink-btn";
// O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image";
// O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text";
// O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name";
// O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date";
// O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn";
// As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag;
