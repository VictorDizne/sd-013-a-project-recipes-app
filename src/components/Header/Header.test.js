import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '..';

describe('Testa o componente Header', () => {
  it('renderiza o botão que exibe a barra de busca', () => {
    const { getByTestId } = render(<Header title="Some Title" displaySearchBtn />);
    const searchBtn = getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
  });
  it('renderiza o botão que redireciona para o Profile', () => {
    const { getByTestId } = render(<Header title="Some Title" displaySearchBtn />);
    const profileBtn = getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
  });
  it('renderiza o título da página', () => {
    const { getByTestId } = render(<Header title="Some Title" displaySearchBtn />);
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
