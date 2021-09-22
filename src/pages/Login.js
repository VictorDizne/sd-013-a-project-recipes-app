import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [personData, setPersonData] = useState({
    email: '',
    password: '',
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const regexForEmail = /\S+@\S+\.\S+/;
  const length = 6;
  const passwordIsValid = personData.password.length > length;
  const emailIsValid = regexForEmail.test(personData.email);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPersonData({ ...personData, [name]: value });
  };

  const handleClick = () => {
    const information = {
      email: personData.email,
    };
    localStorage.setItem('user', JSON.stringify(information));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    setShouldRedirect(true);
  };

  return (
    <div className="login d-flex flex-column justify-content-center">
      { shouldRedirect && <Redirect to="/comidas" /> }
      <span className="slogan">Falta pouco para matar sua fome!</span>
      <form className="d-flex flex-column justify-content-center">
        <input
          className="form-control"
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="Digite um e-mail válido"
          onChange={ handleChange }
        />
        <input
          className="form-control"
          name="password"
          type="password"
          data-testid="password-input"
          placeholder="Senha maior que 6 caracteres"
          onChange={ handleChange }
        />
        <button
          className="btn btn-outline-light"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !((passwordIsValid && emailIsValid === true)) }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
