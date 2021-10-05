import React from 'react';
import { screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchByName,
  fetchByCategoryFood, fetchByCategoryDrink } from '../services/fetchs';
import HomeFood from '../pages/HomeFood';
import HomeDrinks from '../pages/HomeDrinks';
import renderWithRouter from './renderWithRouter';

const CARDS_NUM = 12;
const BTNS = ['Goat-category-filter', 'Cocoa-category-filter'];
const CATEGORIES_NUM = 5;
const TIMER = 10000;
describe(`25 - Implemente os elementos da tela principal de receitas
respeitando os atributos descritos no protótipo`, async () => {
  it('- A tela tem os data-testids de todos os 12 cards da tela de comidas', async () => {
    renderWithRouter(<HomeFood />);
    const cards = await waitForElement(() => screen.findAllByTestId(/recipe-card/));
    expect(cards).toHaveLength(CARDS_NUM);
  });
  it('- A tela tem os data-testids de todos os 12 cards da tela de bebidas', async () => {
    renderWithRouter(<HomeDrinks />);
    const cards = await waitForElement(() => screen.findAllByTestId(/recipe-card/));
    expect(cards).toHaveLength(CARDS_NUM);
  });
});
describe(`26 - Carregue as 12 primeiras
receitas de comidas ou bebidas, uma em cada card`, () => {
  it(`- Caso as receitas sejam de comida,
  deve-se carregar as 12 primeiras receitas`, async () => {
    renderWithRouter(<HomeFood />);
    const mealsApi = await fetchByName('themealdb', '');
    const cardsName = await waitForElement(() => screen.findAllByTestId(/card-name/));
    const cardsImg = await waitForElement(() => screen.findAllByTestId(/card-img/));
    for (let i = 0; i < CARDS_NUM; i += 1) {
      expect(cardsName[i].innerHTML).toBe(mealsApi[i].strMeal);
      expect(cardsImg[i].src).toBe(mealsApi[i].strMealThumb);
    }
  });
  it('- A tela tem os data-testids de todos os 12 cards da tela de bebidas', async () => {
    renderWithRouter(<HomeDrinks />);
    const drinksApi = await fetchByName('thecocktaildb', '');
    const cardsName = await waitForElement(() => screen.findAllByTestId(/card-name/));
    const cardsImg = await waitForElement(() => screen.findAllByTestId(/card-img/));
    for (let i = 0; i < CARDS_NUM; i += 1) {
      if (cardsName[i].innerHTML !== 'AT&amp;T') {
        expect(cardsName[i].innerHTML).toBe(drinksApi[i].strDrink);
      }
      expect(cardsImg[i].src).toBe(drinksApi[i].strDrinkThumb);
    }
  });
});
describe(`27 - Implemente os botões
de categoria para serem utilizados como filtro`, () => {
  it(`- Caso as receitas sejam de comida,
  deve-se exibir as 5 primeiras categorias de comida`, async () => {
    renderWithRouter(<HomeFood />);
    const categoriesApi = await fetchByCategoryFood();
    setTimeout(() => {
      for (let i = 0; i < CATEGORIES_NUM; i += 1) {
        const categoryBtn = screen
          .getByTestId(`${categoriesApi[i].strCategory}-category-filter`);
        expect(categoryBtn).toBeInTheDocument();
        expect(categoryBtn.value).toBe(categoriesApi[i].strCategory);
      }
    }, TIMER);
  });
  it(`- Caso as receitas sejam de bebida,
  deve-se exibir as 5 primeiras categorias de bebida`, async () => {
    renderWithRouter(<HomeDrinks />);
    const categoriesApi = await fetchByCategoryDrink();
    setTimeout(() => {
      for (let i = 0; i < CATEGORIES_NUM; i += 1) {
        const categoryBtn = screen
          .getByTestId(`${categoriesApi[i].strCategory}-category-filter`);
        expect(categoryBtn).toBeInTheDocument();
        expect(categoryBtn.innerHTML).toBe(categoriesApi[i].strCategory);
      }
    }, TIMER);
  });
});
describe(`28 - Implemente o filtro das receitas através
da API ao clicar no filtro de categoria`, () => {
  it(`- Caso as receitas sejam de comida e a categoria seja
  "Goat", deve-se carregar as 12 primeiras receitas de "Goat"`, async () => {
    renderWithRouter(<HomeFood />);
    const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
    const goatBtn = await waitForElement(() => screen
      .findByTestId(BTNS[0]));
    userEvent.click(goatBtn);
    setTimeout(async () => {
      const goatMeals = await waitForElement(() => screen.findAllByTestId(/card-name/));
      for (let i = 0; i < goatMealsApi.length; i += 1) {
        expect(goatMeals[i].innerHTML).toBe(goatMealsApi[i].strMeal);
      }
    }, TIMER);
  });
  it(`- Caso as receitas sejam de bebida e a categoria seja "Cocoa",
  deve-se carregar as 12 primeiras receitas de "Cocoa"`, async () => {
    renderWithRouter(<HomeDrinks />);
    const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
    const cocoaBtn = await waitForElement(() => screen
      .findByTestId(BTNS[1]));
    userEvent.click(cocoaBtn);
    setTimeout(async () => {
      const cocoaMeals = await waitForElement(() => screen.findAllByTestId(/card-name/));
      for (let i = 0; i < goatMealsApi.length; i += 1) {
        expect(cocoaMeals[i].innerHTML).toBe(cocoaDrinksApi[i].strDrink);
      }
    }, TIMER);
  });
});
describe(`29 - Implemente o filtro como um toggle, que se for selecionado de novo,
o app deve retornar as receitas sem nenhum filtro`, () => {
  it(`- Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente,
  deve-se retornar as 12 primeiras receitas sem filtro`, async () => {
    renderWithRouter(<HomeFood />);
    const defaultMealsApi = await fetchByName('themealdb', '');
    const goatBtn = await waitForElement(() => screen
      .findByTestId(BTNS[0]));
    userEvent.click(goatBtn);
    userEvent.click(goatBtn);
    setTimeout(() => {
      for (let i = 0; i < CARDS_NUM; i += 1) {
        const cardName = screen.getByTestId(`${i}-card-name`);
        const cardImg = screen.getByTestId(`${i}-card-img`);
        expect(cardName.innerHTML).toBe(defaultMealsApi[i].strMeal);
        expect(cardImg.src).toBe(defaultMealsApi[i].strMealThumb);
      }
    }, TIMER);
  });
  it(`- Caso as receitas sejam de bebida e o filtro tenha sido selecionado novamente,
  deve-se retornar as 12 primeiras receitas sem filtro`, async () => {
    renderWithRouter(<HomeDrinks />);
    const defaultMealsApi = await fetchByName('thecocktaildb', '');
    const cocoaBtn = await waitForElement(() => screen
      .findByTestId(BTNS[1]));
    userEvent.click(cocoaBtn);
    userEvent.click(cocoaBtn);
    setTimeout(() => {
      for (let i = 0; i < CARDS_NUM; i += 1) {
        const cardName = screen.getByTestId(`${i}-card-name`);
        const cardImg = screen.getByTestId(`${i}-card-img`);
        expect(cardName.innerHTML).toBe(defaultMealsApi[i].strDrink);
        expect(cardImg.src).toBe(defaultMealsApi[i].strDrinkThumb);
      }
    }, TIMER);
  });
});
describe(`30 - Implemente o filtro de categoria
para que apenas um seja selecionado por vez`, () => {
  it(`- Caso as receitas sejam de comida apenas um filtro
  de categoria deve poder ser selecionado por vez`, async () => {
    renderWithRouter(<HomeFood />);
    const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
    const goatBtn = await waitForElement(() => screen
      .findByTestId(BTNS[0]));
    userEvent.click(goatBtn);
    setTimeout(async () => {
      const goatMeals = await waitForElement(() => screen.findAllByTestId(/card-name/));
      expect(goatMeals[0].innerHTML).toBe(goatMealsApi[0].strMeal);
    }, TIMER);
    const chickenMealsApi = await fetchByCategoryFood('Chicken', 'filter');
    const chickenBtn = await waitForElement(() => screen
      .findByTestId('Chicken-category-filter'));
    userEvent.click(chickenBtn);
    setTimeout(async () => {
      const chickenMeals = await waitForElement(() => screen
        .findAllByTestId(/card-name/));
      expect(chickenMeals[0].innerHTML).toBe(chickenMealsApi[0].strMeal);
    }, TIMER);
  });
  it(`- Caso as receitas sejam de bebida apenas um filtro
  de categoria deve poder ser selecionado por vez`, async () => {
    renderWithRouter(<HomeDrinks />);
    const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
    const cocoaBtn = await waitForElement(() => screen
      .findByTestId(BTNS[1]));
    userEvent.click(cocoaBtn);
    setTimeout(async () => {
      const cocoaDrinks = screen.getAllByTestId(/card-name/);
      expect(cocoaDrinks[0].innerHTML).toBe(cocoaDrinksApi[0].strDrink);
    }, TIMER);
    const cocktailDrinksApi = await fetchByCategoryDrink('Cocktail', 'filter');
    const cocktailBtn = await waitForElement(() => screen
      .findByTestId('Cocktail-category-filter'));
    userEvent.click(cocktailBtn);
    setTimeout(async () => {
      const cocktailDrinks = screen.getAllByTestId(/card-name/);
      expect(cocktailDrinks[0].innerHTML).toBe(cocktailDrinksApi[0].strDrink);
    }, TIMER);
  });
});
describe(`31 - Desenvolva o filtro de categorias
com a opção de filtrar por todas as categorias`, () => {
  it(`- Caso as receitas sejam de comida deve
  existir a opção de filtrar por todas as categorias`, async () => {
    renderWithRouter(<HomeFood />);
    const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
    const defaultMealsApi = await fetchByName('themealdb', '');
    const goatBtn = screen.getByTestId(BTNS[0]);
    userEvent.click(goatBtn);
    setTimeout(() => {
      const goatMeals = screen.getAllByTestId(/card-name/);
      expect(goatMeals[0].innerHTML).toBe(goatMealsApi[0].strMeal);
    }, TIMER);
    const allBtn = screen.getByTestId('All-category-filter');
    userEvent.click(allBtn);
    setTimeout(() => {
      const defaultMeals = screen.getAllByTestId(/card-name/);
      expect(defaultMeals[0].innerHTML).toBe(defaultMealsApi[0].strMeal);
    }, TIMER);
  });
  it(`- Caso as receitas sejam de bebida deve
  existir a opção de filtrar por todas as categorias`, async () => {
    renderWithRouter(<HomeDrinks />);
    const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
    const defaultMealsApi = await fetchByName('thecocktaildb', '');
    const cocoaBtn = screen.getByTestId(BTNS[1]);
    userEvent.click(cocoaBtn);
    setTimeout(() => {
      const cocoaDrinks = screen.getAllByTestId(/card-name/);
      expect(cocoaDrinks[0].innerHTML).toBe(cocoaDrinksApi[0].strDrink);
    }, TIMER);
    const allBtn = screen.getByTestId('All-category-filter');
    userEvent.click(allBtn);
    setTimeout(() => {
      const defaultMeals = screen.getAllByTestId(/card-name/);
      expect(defaultMeals[0].innerHTML).toBe(defaultMealsApi[0].strDrink);
    }, TIMER);
  });
});
describe(`32 - Redirecione a pessoa usuária, ao clicar no card, para a tela de detalhes,
que deve mudar a rota e conter o id da receita na URL`, () => {
  it(`- Caso as receitas sejam de comida a rota
  deve mudar para a tela de detalhes da receita`, async () => {
    const { history } = renderWithRouter(<HomeFood />);
    const firstCard = await waitForElement(() => screen.findByTestId('0-card-img'));
    userEvent.click(firstCard);
    expect(history.location.pathname).toBe('/comidas/52977');
  });
  it(`- Caso as receitas sejam de bebida a rota
  deve mudar para a tela de detalhes da receita`, async () => {
    const { history } = renderWithRouter(<HomeDrinks />);
    const firstCard = await waitForElement(() => screen.findByTestId('0-card-img'));
    userEvent.click(firstCard);
    expect(history.location.pathname).toBe('/bebidas/15997');
  });
});
