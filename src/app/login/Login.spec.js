import React from 'react';
import { expect } from 'chai';
import { shallow,  mount} from 'enzyme';
import MockAuthService from "../shared/auth/MockAuthService";
import { Login, Error} from './Login';
import { errors } from "./constants";
import '../shared/test-utils/setup';

describe('Login component rendering', () => {
    let loginComponent;
    beforeEach(() => {
        loginComponent = shallow(<Login setLoginSuccessful={success => success} authService={ new MockAuthService() }/>)
    });

    it('renders the form-block', () => {
        expect(loginComponent.find('.form-block')).to.have.length(1);
    });

    it('renders the fieldset ', () => {
        expect(loginComponent.find('fieldset')).to.have.length(1);
    });

    it('renders the input-block', () => {
        expect(loginComponent.find('.input-block')).to.have.length(2);
        expect(loginComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(loginComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

    it('renders the remember-block', () => {
        expect(loginComponent.find('.remember-block')).to.have.length(1);
        expect(loginComponent.find('.remember-block').render().text().trim()).to.equal('Remember me');
    });

    it('renders the button-block', () => {
        expect(loginComponent.find('.button-block')).to.have.length(1);
        expect(loginComponent.find('.button-block').render().text()).to.equal('Login');
    });

    // TODO: Test can't change state object in onLoginError and onLoginSuccess methods. Figure out why it happens.
    // it('renders the error block when credentials are wrong', () => {
    //     loginComponent = mount(<Login setLoginSuccessful={success => success} authService={new MockAuthService()}/>);
    //     loginComponent.setState({email: 'wrong@email.pl', password: 'WrongPassword1'});
    //     loginComponent.find('button').at(0).simulate('click');
    //
    //     expect(loginComponent.state('wrongCreds')).to.equal(true);
    //     expect(loginComponent.find(Error)).to.have.length(1);
    //     expect(loginComponent.find(Error).render().text()).to.equal(errors.wrongCreds);
    // });

    it('renders no error on start', () => {
        expect(loginComponent.find(Error)).to.have.length(0);
    });

    it('renders the error block when email input touched and empty', () => {
        const email = loginComponent.find('input').at(0);
        email.simulate('focus');
        email.simulate('blur');

        expect(loginComponent.find(Error)).to.have.length(1);
        expect(loginComponent.find(Error).render().text()).to.equal(errors.noEmail);
    });

    it('renders the error block when password input touched and empty', () => {
        const password = loginComponent.find('input').at(1);
        password.simulate('focus');
        password.simulate('blur');

        expect(loginComponent.find(Error)).to.have.length(1);
        expect(loginComponent.find(Error).render().text()).to.equal(errors.noPassword);
    });


    it('renders the error block when email input touched and value is invalid', () => {
        const email = loginComponent.find('input').at(0);
        email.simulate('focus');
        email.prop('onChange')({target: {value: 'invalid_email.pl'}});
        email.simulate('blur');

        expect(loginComponent.find(Error)).to.have.length(1);
        expect(loginComponent.find(Error).render().text()).to.equal(errors.invalidEmail);
    });

    it('renders the error block when password input touched and value is invalid', () => {
        const password = loginComponent.find('input').at(1);
        password.simulate('focus');
        password.prop('onChange')({target: {value: 'invalid_password'}});
        password.simulate('blur');

        expect(loginComponent.find(Error)).to.have.length(1);
        expect(loginComponent.find(Error).render().text()).to.equal(errors.invalidPassword);
    });

    it('renders the input-block', () => {
        expect(loginComponent.find('.input-block')).to.have.length(2);
        expect(loginComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(loginComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

});