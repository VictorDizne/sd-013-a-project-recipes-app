import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages';

describe('Test on login screen, ', () => {
  it('that there are email and password inputs', () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    expect(emailInput).toBeInTheDocument(emailInput);
    expect(emailInput).toBeInTheDocument(passwordInput);
  });

  // it('that there are email and password inputs', () => {
  //   render(<Login />);
  // });

  // it('that there are email and password inputs', () => {
  //   render(<Login />);
  // });
});
