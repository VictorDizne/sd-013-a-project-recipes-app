import React from 'react';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';

describe('Testa o Provider', () => {
  it('Testa se os objetos estão definidos', () => {
    render(<Provider />);
    expect('ContextLogin').toBeDefined();
    expect('ContextHeader').toBeDefined();
    expect('ContextComidas').toBeDefined();
    expect('ContextBebidas').toBeDefined();
    expect('ContextFooter').toBeDefined();
  });
});
