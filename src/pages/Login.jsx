import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

import { Input, Button } from '../components';
import { setDefaultLocalStorage } from '../services/localStorageFunctions';

const Main = styled.div`
  background-color: var(--primary-color);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  form { 
    border: 1px solid #ffffffab;
    border-radius: 4px;
    box-shadow: 1px 1px 5px 1px #ffffff67;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 0px;
    margin: 10px;

    * {
      text-align: center;
      font-family: Montserrat , sans-serif;
      font-size: 1.1rem;
    }

    input {
      width: 80%;
      border-radius: 4px;
      margin-bottom: 8px;
    }
    button {
      box-shadow: 1px 1px 3px 1px #ffffff67;
      color: #fff;
      padding: 4px 10px;
      border: 1px solid #ffffffab;
      border-radius: 4px;
      background: none;
      margin-top: 16px;

      &:hover {
        box-shadow: 1px 1px 3px 1px #ffffff;
        border: 1px solid #ffffff;
        color: #ffffff;
    }
    }
  }
`;

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const checkLoginData = (email, password) => {
    const MIN_LENGTH_PASSWORD = 6;
    const regex = /\S+@\S+\.\S+/;

    return regex.test(email) && password.length > MIN_LENGTH_PASSWORD;
  };

  const handleChange = ({ target: { name, value } }) => {
    setLogin({
      ...login,
      [name]: value,
    });
  };

  useEffect(() => {
    setDisableButton(checkLoginData(login.email, login.password));
  }, [login.email, login.password]);

  const history = useHistory(); // https://reactrouter.com/web/api/Hooks/usehistory
  const handleSubmit = (event) => {
    event.preventDefault();

    setDefaultLocalStorage(login.email);

    history.push('/comidas');
  };

  return (
    <Main>
      <form onSubmit={ handleSubmit }>
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
          type="submit"
          buttonText="Login"
          disabled={ !disableButton }
        />
      </form>
    </Main>
  );
};

export default Login;
