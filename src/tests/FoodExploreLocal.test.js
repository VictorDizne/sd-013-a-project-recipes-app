import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FoodExploreLocal from '../pages/FoodExploreLocal';

describe('1 - Verifica os testes da página de Explorar origem', () => {
  afterEach(() => jest.clearAllMocks());

  // const meals = [{
  //   idMeal: '52977',
  //   strMeal: 'Corba',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  // },
  // {
  //   idMeal: '53060',
  //   strMeal: 'Burek',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
  // },
  // {
  //   idMeal: '52978',
  //   strMeal: 'Kumpir',
  //   strMealThumb: '"https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg"',
  // },
  // {
  //   idMeal: '53026',
  //   strMeal: 'Tamiya',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg',
  // },
  // {
  //   idMeal: '52785',
  //   strMeal: 'Dal fry',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
  // },
  // {
  //   idMeal: '52804',
  //   strMeal: 'Poutine',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg',
  // },
  // {
  //   idMeal: '52844',
  //   strMeal: 'Lasagne',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  // },
  // {
  //   idMeal: '52929',
  //   strMeal: 'Timbits',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
  // },
  // {
  //   idMeal: '52948',
  //   strMeal: 'Wontons',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/1525876468.jpg',
  // },
  // {
  //   idMeal: '52971',
  //   strMeal: 'Kafteji',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg',
  // },
  // {
  //   idMeal: '53013',
  //   strMeal: 'Big Mac',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
  // },
  // {
  //   idMeal: '53027',
  //   strMeal: 'Koshari',
  //   strMealThumb: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
  // }];

  const options = [
    { strArea: 'American' },
    { strArea: 'British' },
    { strArea: 'Canadian' },
    { strArea: 'Chinese' },
    { strArea: 'Croatian' },
    { strArea: 'Dutch' },
    { strArea: 'Egyptian' },
    { strArea: 'French' },
    { strArea: 'Greek' },
    { strArea: 'Indian' },
    { strArea: 'Irish' },
    { strArea: 'Italian' },
    { strArea: 'Jamaican' },
    { strArea: 'Japanese' },
    { strArea: 'Kenyan' },
    { strArea: 'Malaysian' },
    { strArea: 'Mexican' },
    { strArea: 'Moroccan' },
    { strArea: 'Polish' },
    { strArea: 'Portuguese' },
    { strArea: 'Russian' },
    { strArea: 'Spanish' },
    { strArea: 'Thai' },
    { strArea: 'Tunisian' },
    { strArea: 'Turkish' },
    { strArea: 'Unknown' },
    { strArea: 'Vietnamese' },
  ];

  // const japaneseMeals = {
  //   meals: [
  //     {
  //       strMeal: 'Chicken Karaage',
  //       strMealThumb: 'https://www.themealdb.com/images/media/meals/tyywsw1505930373.jpg',
  //       idMeal: '52831',
  //     },
  //     {
  //       strMeal: 'Honey Teriyaki Salmon',
  //       strMealThumb: 'https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg',
  //       idMeal: '52773',
  //     },
  //     {
  //       strMeal: 'Katsu Chicken curry',
  //       strMealThumb: 'https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg',
  //       idMeal: '52820',
  //     },
  //     {
  //       strMeal: 'Teriyaki Chicken Casserole',
  //       strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  //       idMeal: '52772',
  //     },
  //     {
  //       strMeal: 'Yaki Udon',
  //       strMealThumb: 'https://www.themealdb.com/images/media/meals/wrustq1511475474.jpg',
  //       idMeal: '52871',
  //     },
  //   ],
  // };

  // test('Verifica se o componente inicia com as receitas corretas', () => {
  //   const response = { json: jest.fn().mockImplementation(() => Promise.resolve(meals)) };
  //   global.fetch = jest.fn().mockResolvedValue(response);
  //   // const fetchApi = { json: jest.fn(() => Promise.resolve(meals)) };
  //   // const fetchApi = { json: jest.fn().mockResolvedValue(meals)) };
  //   renderWithRouter(<FoodExploreLocal />);

  //   expect(global.fetch).toBeCalledTimes(1);
  // });

  test('Verifica se está com o header com os componentes corretos', () => {
    renderWithRouter(<FoodExploreLocal />);

    const title = screen.getByText(/explorar origem/i);
    expect(title).toBeInTheDocument();

    const img = screen.getByTestId(/profile-top-btn/i);
    expect(img).toBeInTheDocument();

    const input = screen.getByTestId(/search-top-btn/i);
    expect(input).toBeInTheDocument();
  });

  test('Verifica se está com o footer com os componentes corretos', () => {
    renderWithRouter(<FoodExploreLocal />);

    const link1 = screen.getByTestId(/drinks-bottom-btn/i);
    expect(link1).toBeInTheDocument();

    const link2 = screen.getByTestId(/explore-bottom-btn/i);
    expect(link2).toBeInTheDocument();

    const link3 = screen.getByTestId(/food-bottom-btn/i);
    expect(link3).toBeInTheDocument();

    const footerField = screen.getByTestId('footer');
    expect(footerField).toBeInTheDocument();
  });

  test('Verifica se existe uma label para o elemento select', async () => {
    renderWithRouter(<FoodExploreLocal />);

    const label = await screen.findByLabelText(/selecione a origem/i);
    expect(label).toBeInTheDocument();
  });

  test('Verifica se possui o elemento select correto ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    const select = await screen.findByTestId(/explore-by-area-dropdown/i);
    expect(select).toBeInTheDocument();
  });

  test('Verifica se possui os dropdowns corretos ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    options.forEach(async ({ strArea }) => {
      const option = await screen.findByTestId(`${strArea}-option`);
      expect(option.value).toBe(strArea);
    });
  });

  //

  test('Verifica se possui treze  elementos h1 ao iniciar a tela ', () => {
    const { getAllByRole } = renderWithRouter(<FoodExploreLocal />);
    const h1Number = 13;
    const h1 = getAllByRole('heading', { level: 1 });
    expect(h1.length).toBe(h1Number);
  });

  test('Verifica se possui treze  imagens ao iniciar a tela ', async () => {
    renderWithRouter(<FoodExploreLocal />);
    const imgNumber = 13;
    const img = await screen.findAllByRole('img');
    expect(img.length).toBe(imgNumber);
  });
});

// ================= MAIS TESTES ===================================
const btnSelect = 'explore-by-area-dropdown';

describe('Verifica a página FoodExploreLocal ', () => {
  test('testa se página contém o título "Explorar Origem" ', async () => {
    const { findByText } = renderWithRouter(<FoodExploreLocal />);

    const title = await findByText(/Explorar Origem/i);
    expect(title).toBeInTheDocument();
  });

  test('testa se página contém um dropdown', async () => {
    const { findByTestId } = renderWithRouter(<FoodExploreLocal />);
    const dropDown = await findByTestId(btnSelect);
    expect(dropDown).toBeInTheDocument('explore-by-area-dropdown');
  });

  test('testa se o dropdown contém as opções de países', async () => {
    const { findByTestId } = renderWithRouter(<FoodExploreLocal />);
    const americanOption = await findByTestId('American-option');
    expect(americanOption).toBeInTheDocument();
    const britishOption = await findByTestId('British-option');
    expect(britishOption).toBeInTheDocument();
    const turkishOption = await findByTestId('Turkish-option');
    expect(turkishOption).toBeInTheDocument();
    const vietnameseOption = await findByTestId('Vietnamese-option');
    expect(vietnameseOption).toBeInTheDocument();
  });
});
