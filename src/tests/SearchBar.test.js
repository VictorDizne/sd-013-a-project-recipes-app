import React from 'react';
import { fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import renderWithRouter from './renderWithRouter';

const THREE = 3;

describe('Testa o component SearchBar', () => {
  const { getByTestId } = renderWithRouter(<SearchBar />);
  const inputBar = getByTestId('search-input');
  const nameRadio = getByTestId('name-search-radio');
  const firstLetterRadio = getByTestId('first-letter-search-radio');
  const ingredientRadio = getByTestId('ingredient-search-radio');

  test('Tem os data-testids da barra e dos radio-buttons', () => {
    expect(inputBar).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
  });

  test('Altera corretamente o valor dos inputs', () => {
    expect(inputBar).toHaveValue('');
    fireEvent.change(inputBar, { target: { value: 'chicken' } });
    expect(inputBar).toHaveValue('chicken');

    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    fireEvent.click(firstLetterRadio);
    expect(firstLetterRadio.checked).toBe(true);

    fireEvent.click(ingredientRadio);
    expect(ingredientRadio.checked).toBe(true);
  });

  test('Verifique se existem 3 radio buttons', () => {
    const { getAllByRole } = renderWithRouter(<SearchBar />);
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(THREE);
  });
});
