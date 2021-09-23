import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const userLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  function userValid() {
    const passLength = 7;
    const validPassword = password.length >= passLength;
    const validEmail = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i.test(
      email,
    );
    return validEmail && validPassword;
  }
  // const userValid = () => {
  //   const userPass = 6;
  //   if (password.length <= userPass) return false;
  //   if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) return false;
  //   return true;
  // };

  // const checkEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
  //   .test(email);

  // const chekcPass = password.length > userPass;
  // const verify = checkEmail && chekcPass ? trureturn : false;
  // return verify;
  return (
    <section>
      <form>
        <input
          type="email"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          // onChange={ userValid }
          data-testid="email-input"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (event) => setPassword(event.target.value) }
        />

        <button
          type="button"
          onClick={ userLogin }
          disabled={ !userValid() }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

export default Login;
