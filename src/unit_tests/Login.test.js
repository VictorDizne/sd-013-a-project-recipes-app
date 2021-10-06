import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/dom';
import { Login } from '../pages';

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
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const loginButton = screen.getByRole('button');
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(emailInput, { target: { value: 'recipe@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginButton);

    expect(window.location.href).toBe(`${window.location.origin}/comidas`);
  });
});
