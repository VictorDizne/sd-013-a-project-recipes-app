import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Login() {
  // const [name, setName] = useState('');
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
    const userPass = 6;
    const checkEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
      .test(email);

    const chekcPass = password.length > userPass;
    const verify = checkEmail && chekcPass ? true : false;
    return verify;
  }

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
