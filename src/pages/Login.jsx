import React, { useState } from 'react';

const Login = () => {
  const [email, setStateEmail] = useState('');
  const [password, setStatePassword] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true)

  function handleChange({ target: { value } }) {
    setStateEmail(value);
  }

  function handleChange2({ target: { value } }) {
    setStatePassword(value);
  }

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/;
    const passwordMin = 7;
    const passwordCorrect = password.length >= passwordMin;
    return re.test(email) && passwordCorrect;
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        onChange={ handleChange }
        value={ email }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        onChange={ handleChange2 }
        value={ password }
      />
      <button
        disabled={ !(validateEmail()) }
        data-testid="login-submit-btn"
        type="submit"
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
