import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            buttonValidate: true,
        }

        this.validateEmail = this.validateEmail.bind(this);
        this.saveLocalStorage = this.saveLocalStorage.bind(this);
    }
    
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        }, () => this.validateEmail());
    } 
    
    validateEmail() {
        const { email, password } = this.state;
        const passwordLength = 6;
        const correctPassword = password.length > passwordLength;
        const regexForEmail = /\S+@\S+\.\S+/; 
        const correctEmail = regexForEmail.test(email);
        const validate = !(correctEmail && correctPassword);
        this.setState({ buttonValidate: validate });
        console.log(correctPassword);
        /* console.log(correctEmail);
        console.log(validate); */
    };

    // mealsToken e cocktailsToken
    saveLocalStorage() {
        const { email } = this.state;
        localStorage.setItem('user', JSON.stringify({ email })); // ele joga a chave user e o value email em estilo string para dentro do localStorage
        localStorage.setItem('mealsToken', 1);
        localStorage.setItem('cocktailsToken', 1);
    }
    
    render() {
        const { email, password, buttonValidate } = this.state;

        return (
            <main>
                <input name="email" type="email" placeholder="Email" data-testid="email-input" value={ email } onChange={ this.handleChange } />
                <input name="password" type="password" placeholder="Senha" data-testid="password-input" value={ password } onChange={ this.handleChange } />
                <Link to="/comidas" >
                    <button type="button" data-testid="login-submit-btn" disabled={ buttonValidate } onClick={ this.saveLocalStorage } >
                        Entrar
                    </button>
                </ Link>
            </main>
        )
    }
}

export default Login;
