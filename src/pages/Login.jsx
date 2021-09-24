import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from '../components';

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const checkLoginData = (email, password) => {
    const regex = /\S+@\S+.\S+/;
    const MIN_LENGTH_PASSWORD = 6;

    return password.length >= MIN_LENGTH_PASSWORD && regex.test(email);
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    setDisableButton(!checkLoginData(login.email, login.password));
  }, [login]);

  const history = useHistory(); // https://reactrouter.com/web/api/Hooks/usehistory
  const redirectToFoods = () => {
    history.push('/comidas');
    localStorage.setItem('user', JSON.stringify(login.email));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <main>
      <Input
        type="email"
        id="email-input"
        name="email"
        className="emailInput"
        placeholder="E-mail"
        onChange={ handleChange }
      />
      <Input
        type="password"
        id="password-input"
        name="password"
        className="passwordInput"
        placeholder="Senha"
        onChange={ handleChange }
      />
      <Button
        className="buttonLogin"
        id="login-submit-btn"
        type="button"
        buttonText="Login"
        disabled={ disableButton }
        onClick={ redirectToFoods }
      />
    </main>
  );
};

export default Login;
