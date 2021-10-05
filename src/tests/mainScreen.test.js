// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { fetchByName,
//   fetchByCategoryFood, fetchByCategoryDrink } from '../services/fetchs';
// import HomeFood from '../pages/HomeFood';
// import HomeDrinks from '../pages/HomeDrinks';
// import renderWithRouter from './renderWithRouter';

// const CARDS_NUM = 12;
// const CATEGORIES_NUM = 5;

// describe(`25 - Implemente os elementos da tela principal de receitas
// respeitando os atributos descritos no protótipo`, () => {
//   it('- A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
//     renderWithRouter(<HomeFood />);
//     const cards = screen.getAllByTestId(/recipe-card/);
//     expect(cards).toHaveLength(CARDS_NUM);
//   });
//   it('- A tela tem os data-testids de todos os 12 cards da tela de bebidas', () => {
//     renderWithRouter(<HomeDrinks />);
//     const cards = screen.getAllByTestId(/recipe-card/);
//     expect(cards).toHaveLength(CARDS_NUM);
//   });
// });

// describe(`26 - Carregue as 12 primeiras
// receitas de comidas ou bebidas, uma em cada card`, () => {
//   it(`- Caso as receitas sejam de comida,
//   deve-se carregar as 12 primeiras receitas`, async () => {
//     renderWithRouter(<HomeFood />);
//     const mealsApi = await fetchByName('themealdb', '');
//     for (let i = 0; i < CARDS_NUM; i += 1) {
//       const cardName = screen.getByTestId(`${i}-card-name`);
//       const cardImg = screen.getByTestId(`${i}-card-img`);
//       expect(cardName.innerHTML).toBe(mealsApi[i].strMeal);
//       expect(cardImg.src).toBe(mealsApi[i].strMealThumb);
//     }
//   });
//   it('- A tela tem os data-testids de todos os 12 cards da tela de bebidas', async () => {
//     renderWithRouter(<HomeFood />);
//     const drinksApi = await fetchByName('thecocktaildb', '');
//     for (let i = 0; i < CARDS_NUM; i += 1) {
//       const cardName = screen.getByTestId(`${i}-card-name`);
//       const cardImg = screen.getByTestId(`${i}-card-img`);
//       expect(cardName.innerHTML).toBe(mealsApi[i].strDrink);
//       expect(cardImg.src).toBe(mealsApi[i].strDrinkThumb);
//     }
//   });
// });

// describe(`27 - Implemente os botões
// de categoria para serem utilizados como filtro`, () => {
//   it(`- Caso as receitas sejam de comida,
//   deve-se exibir as 5 primeiras categorias de comida`, async () => {
//     renderWithRouter(<HomeFood />);
//     const categoriesApi = await fetchByCategoryFood();
//     for (let i = 0; i < CATEGORIES_NUM; i += 1) {
//       const categoryBtn = screen.getByTestId(`${categoriesApi[i].strCategory}-category-filter`);
//       expect(categoryBtn).toBeInTheDocument();
//       expect(categoryBtn.value).toBe(categoriesApi[i].strCategory);
//     }
//   });
//   it(`- Caso as receitas sejam de bebida,
//   deve-se exibir as 5 primeiras categorias de bebida`, async () => {
//     renderWithRouter(<HomeDrinks />);
//     const categoriesApi = await fetchByCategoryDrink();
//     for (let i = 0; i < CATEGORIES_NUM; i += 1) {
//       const categoryBtn = screen.getByTestId(`${categoriesApi[i].strCategory}-category-filter`);
//       expect(categoryBtn).toBeInTheDocument();
//       expect(categoryBtn.value).toBe(categoriesApi[i].strCategory);
//     }
//   });
// });

// describe(`28 - Implemente o filtro das receitas através
// da API ao clicar no filtro de categoria`, () => {
//   it(`- Caso as receitas sejam de comida e a categoria seja
//   "Goat", deve-se carregar as 12 primeiras receitas de "Goat"`, async () => {
//     renderWithRouter(<HomeFood />);
//     const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
//     const goatBtn = screen.getByTestId('Goat-category-filter');
//     userEvent.click(goatBtn);
//     for (let i = 0; i < goatMealsApi.length; i += 1) {
//       const goatMeal = screen.getByTestId(`${i}-card-name`);
//       expect(goatMeal.innerHTML).toBe(goatMealsApi[i].strMeal);
//     }
//   });
//   it(`- Caso as receitas sejam de bebida e a categoria seja "Cocoa",
//   deve-se carregar as 12 primeiras receitas de "Cocoa"`, async () => {
//     renderWithRouter(<HomeDrinks />);
//     const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
//     const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
//     userEvent.click(cocoaBtn);
//     for (let i = 0; i < goatMealsApi.length; i += 1) {
//       const cocoaMeal = screen.getByTestId(`${i}-card-name`);
//       expect(cocoaMeal.innerHTML).toBe(cocoaDrinksApi[i].strDrink);
//     }
//   });
// });

// describe(`29 - Implemente o filtro como um toggle, que se for selecionado de novo,
// o app deve retornar as receitas sem nenhum filtro`, () => {
//   it(`- Caso as receitas sejam de comida e o filtro tenha sido selecionado novamente,
//   deve-se retornar as 12 primeiras receitas sem filtro`, async () => {
//     renderWithRouter(<HomeFood />);
//     const defaultMealsApi = await fetchByName('themealdb', '');
//     const goatBtn = screen.getByTestId('Goat-category-filter');
//     userEvent.click(goatBtn);
//     userEvent.click(goatBtn);
//     for (let i = 0; i < CARDS_NUM; i += 1) {
//       const cardName = screen.getByTestId(`${i}-card-name`);
//       const cardImg = screen.getByTestId(`${i}-card-img`);
//       expect(cardName.innerHTML).toBe(defaultMealsApi[i].strMeal);
//       expect(cardImg.src).toBe(defaultMealsApi[i].strMealThumb);
//     }
//   });
//   it(`- Caso as receitas sejam de bebida e o filtro tenha sido selecionado novamente,
//   deve-se retornar as 12 primeiras receitas sem filtro`, async () => {
//     renderWithRouter(<HomeDrinks />);
//     const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
//     const defaultMealsApi = await fetchByName('thecocktaildb', '');
//     const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
//     userEvent.click(cocoaBtn);
//     userEvent.click(cocoaDrinks);
//     for (let i = 0; i < CARDS_NUM; i += 1) {
//       const cardName = screen.getByTestId(`${i}-card-name`);
//       const cardImg = screen.getByTestId(`${i}-card-img`);
//       expect(cardName.innerHTML).toBe(mealsApi[i].strDrink);
//       expect(cardImg.src).toBe(mealsApi[i].strDrinkThumb);
//     }
//   });
// });

// describe(`30 - Implemente o filtro de categoria
// para que apenas um seja selecionado por vez`, () => {
//   it(`- Caso as receitas sejam de comida apenas um filtro
//   de categoria deve poder ser selecionado por vez`, async () => {
//     renderWithRouter(<HomeFood />);
//     const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
//     const goatBtn = screen.getByTestId('Goat-category-filter');
//     userEvent.click(goatBtn);
//     const goatMeals = screen.getAllByTestId(/card-name/);
//     expect(goatMeals[0].innerHTML).toBe(goatMealsApi[0].strMeal);
//     const chickenMealsApi = await fetchByCategoryFood('Chicken', 'filter');
//     const chickenBtn = screen.getByTestId('Chicken-category-filter');
//     userEvent.click(chickenBtn);
//     const chickenMeals = screen.getAllByTestId(/card-name/);
//     expect(chickenMeals[0].innerHTML).toBe(chickenMealsApi[0].strMeal);
//   });
//   it(`- Caso as receitas sejam de bebida apenas um filtro
//   de categoria deve poder ser selecionado por vez`, async () => {
//     renderWithRouter(<HomeDrinks />);
//     const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
//     const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
//     userEvent.click(cocoaBtn);
//     const cocoaDrinks = screen.getAllByTestId(/card-name/);
//     expect(cocoaDrinks[0].innerHTML).toBe(cocoaDrinksApi[0].strDrink);
//     const cocktailDrinksApi = await fetchByCategoryDrink('Cocktail', 'filter');
//     const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
//     userEvent.click(cocktailBtn);
//     const cocktailDrinks = screen.getAllByTestId(/card-name/);
//     expect(cocktailDrinks[0].innerHTML).toBe(cocktailDrinksApi[0].strDrink);
//   });
// });

// describe(`31 - Desenvolva o filtro de categorias
// com a opção de filtrar por todas as categorias`, () => {
//   it(`- Caso as receitas sejam de comida deve
//   existir a opção de filtrar por todas as categorias`, async () => {
//     renderWithRouter(<HomeFood />);
//     const goatMealsApi = await fetchByCategoryFood('Goat', 'filter');
//     const defaultMealsApi = await fetchByName('themealdb', '');
//     const goatBtn = screen.getByTestId('Goat-category-filter');
//     userEvent.click(goatBtn);
//     const goatMeals = screen.getAllByTestId(/card-name/);
//     expect(goatMeals[0].innerHTML).toBe(goatMealsApi[0].strMeal);
//     const allBtn = screen.getByTestId('All-category-filter');
//     userEvent.click(allBtn);
//     const defaultMeals = screen.getAllByTestId(/card-name/);
//     expect(defaultMeals[0].innerHTML).toBe(defaultMealsApi[0].strMeal);
//   });
//   it(`- Caso as receitas sejam de bebida deve
//   existir a opção de filtrar por todas as categorias`, async () => {
//     renderWithRouter(<HomeDrinks />);
//     const cocoaDrinksApi = await fetchByCategoryDrink('Cocoa', 'filter');
//     const defaultMealsApi = await fetchByName('thecocktaildb', '');
//     const cocoaBtn = screen.getByTestId('Cocoa-category-filter');
//     userEvent.click(cocoaBtn);
//     const cocoaDrinks = screen.getAllByTestId(/card-name/);
//     expect(cocoaDrinks[0].innerHTML).toBe(cocoaDrinksApi[0].strDrink);
//     const allBtn = screen.getByTestId('All-category-filter');
//     userEvent.click(allBtn);
//     const defaultMeals = screen.getAllByTestId(/card-name/);
//     expect(defaultMeals[0].innerHTML).toBe(defaultMealsApi[0].strDrink);
//   });
// });

// describe(`32 - Redirecione a pessoa usuária, ao clicar no card, para a tela de detalhes,
// que deve mudar a rota e conter o id da receita na URL`, () => {
//   it(`- Caso as receitas sejam de comida a rota
//   deve mudar para a tela de detalhes da receita`, () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     const firstCard = screen.getByTestId('0-card-img');
//     userEvent.click(firstCard);
//     expect(history.location).toBe('http://localhost:3000/comidas/52977');
//   });
//   it(`- Caso as receitas sejam de bebida a rota
//   deve mudar para a tela de detalhes da receita`, () => {
//     const { history } = renderWithRouter(<FavoriteRecipes />);
//     const firstCard = screen.getByTestId('0-card-img');
//     userEvent.click(firstCard);
//     expect(history.location).toBe('http://localhost:3000/bebidas/15997');
//   });
// });
