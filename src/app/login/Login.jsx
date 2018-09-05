import React, { Component } from 'react';
import './Login.css';
import { errors, isEmailValid, isPasswordValid } from './constants';

function Error(params) {
    return (
        <div className="error-block">
            <div className="error">{params.text}</div>
        </div>
    )
}

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        remember: false,
        passwordValid: false,
        emailValid: false,
        canShowPasswordErrors: false,
        canShowEmailErrors: false,
        wrongCreds: false,
    };

    constructor(params) {
        super(params);
        this.setLoginSuccessful = params.setLoginSuccessful;
        this.authService = params.authService;
    }

    login = () => {
        if (!isPasswordValid(this.state.password)) {
            this.setState({
                passwordValid: false
            });
            return;
        }
        this.authService.login(this.state.email, this.state.password)
            .then(this.onLoginSuccess)
            .catch(this.onLoginError);
    };

    onLoginSuccess = response => {
        this.setState({
            wrongCreds: false
        });
        this.setLoginSuccessful(response.loginSuccessful);
    };

    onLoginError = error => {
        this.setState({
            wrongCreds: true
        });
        this.setLoginSuccessful(error.loginSuccessful);
    };

    emailChange = event => {
        const value = event.target.value;
        this.setState({
            email: value,
            emailValid: isEmailValid(value),
            wrongCreds: false
        });
    };

    passwordChange = event => {
        const value = event.target.value;
        this.setState({
            password: value,
            passwordValid: isPasswordValid(value),
            wrongCreds: false
        });
    };

    submitByEnter = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.login();
        }
    };

    showEmailErrors = () => {
        this.setState(
            {canShowEmailErrors: true}
        );
    };

    showPasswordErrors = () => {
        this.setState(
            {canShowPasswordErrors: true}
        )
    };

    render() {
        const {
            email,
            password,
            emailValid,
            passwordValid,
            canShowEmailErrors,
            canShowPasswordErrors,
            wrongCreds
        } = this.state;


        return (
            <div className="form-block">
                <form>
                    <fieldset>
                        <div className="input-block">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                   name="email"
                                   id="email"
                                   placeholder="Email"
                                   onChange={this.emailChange} onBlur={this.showEmailErrors}
                                   onKeyPress={this.submitByEnter}
                                   required/>
                        </div>
                        {canShowEmailErrors && !email && <Error text={errors.noEmail}/>}
                        {canShowEmailErrors && email && !emailValid && <Error text={errors.invalidEmail}/>}
                        <div className="input-block">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Password"
                                   onChange={this.passwordChange}
                                   onBlur={this.showPasswordErrors}
                                   onKeyPress={this.submitByEnter}
                                   required/>
                        </div>
                        {canShowPasswordErrors && !password && <Error text={errors.noPassword}/>}
                        {canShowPasswordErrors && password && !passwordValid &&
                        <Error text={errors.invalidPassword}/>}
                        {wrongCreds && <Error text={errors.wrongCreds}/>}
                        <div className="remember-block">
                            <label htmlFor="remember">
                                <input type="checkbox"
                                       name="remember"
                                       id="remember"/>
                                Remember me
                            </label>
                        </div>
                        <div className="button-block">
                            <button className="button"
                                    type="button"
                                    onClick={this.login}>
                                Login
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export { Login, Error };
