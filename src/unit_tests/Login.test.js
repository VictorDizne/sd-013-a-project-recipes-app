import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Login } from '../pages';
import renderWithRouterAndContext from './renderWithRouterAndContext';
import App from '../App';

describe('Test on login screen, ', () => {
  it('that there are email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    expect(emailInput).toBeInTheDocument(emailInput);
    expect(emailInput).toBeInTheDocument(passwordInput);
  });

  it('that there is a disabled button before validation', () => {
    render(<Login />);
    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(emailInput, { target: { value: 'recipe@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(loginButton).not.toBeDisabled();
  });

  it('that the click redirects to main page', () => {
    renderWithRouterAndContext(<App />);
    const loginButton = screen.getByRole('button');
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(emailInput, { target: { value: 'recipe@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginButton);
    expect(loginButton).not.toBeDisabled();

    expect(window.location.href).toBe(`${window.location.origin}/comidas`);
  });
});
