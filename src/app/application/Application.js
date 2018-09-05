import React, {Component} from 'react';
import './Application.css';
import Login from '../login/Login.js';
import { MockAuthService } from '../shared/auth/MockAuthService';

export class Application extends Component {
    state = {
        loginSuccessful: false,
    };

    setLoginSuccessful = success => {
        this.setState({
            loginSuccessful: success
        });
    };

    render() {
        const {loginSuccessful} = this.state;
        return (
            <div className="app">
                {!loginSuccessful && <Login
                    setLoginSuccessful={ this.setLoginSuccessful }
                    authService={ new MockAuthService() }/>
                }
                {loginSuccessful && <div className="success">
                    <h1>Login successful!</h1>
                </div>}
            </div>
        );
    }
}

export default Application;