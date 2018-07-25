import React from 'react';
import {expect} from 'chai';
import {Login, Error, isEmailValid, isPasswordValid, errors} from './Login';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Login component rendering', () => {
    let appComponent;
    beforeEach(() => {
        appComponent = shallow(<Login/>)
    });

    it('renders the app block', () => {
        expect(appComponent.find('.app')).to.have.length(1);
    });

    it('renders the form-block', () => {
        expect(appComponent.find('.form-block')).to.have.length(1);
    });

    it('renders the fieldset ', () => {
        expect(appComponent.find('fieldset')).to.have.length(1);
    });

    it('renders the input-block', () => {
        expect(appComponent.find('.input-block')).to.have.length(2);
        expect(appComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(appComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

    it('renders the remember-block', () => {
        expect(appComponent.find('.remember-block')).to.have.length(1);
        expect(appComponent.find('.remember-block').render().text().trim()).to.equal('Remember me');
    });

    it('renders the button-block', () => {
        expect(appComponent.find('.button-block')).to.have.length(1);
        expect(appComponent.find('.button-block').render().text()).to.equal('Login');
    });

    it('renders the success block when login successful', () => {
        appComponent.setState({email: 'test@test.pl', password: 'Password1'});
        appComponent.find('button').at(0).simulate('click');

        expect(appComponent.find('.success')).to.have.length(1);
        expect(appComponent.find('.success').render().text()).to.equal('Login successful!');
        expect(appComponent.find('.form-block')).to.have.length(0);
    });

    it('renders the error block when credentials are wrong', () => {
        appComponent.setState({email: 'wrong@email.pl', password: 'WrongPassword1'});
        appComponent.find('button').at(0).simulate('click');

        expect(appComponent.find('.success')).to.have.length(0);
        expect(appComponent.find(Error)).to.have.length(1);
        expect(appComponent.find(Error).render().text()).to.equal(errors.wrongCreds);
    });

    it('renders no error on start', () => {
        expect(appComponent.find(Error)).to.have.length(0);
    });

    it('renders the error block when email input touched and empty', () => {
        const email = appComponent.find('input').at(0);
        email.simulate('focus');
        email.simulate('blur');

        expect(appComponent.find(Error)).to.have.length(1);
        expect(appComponent.find(Error).render().text()).to.equal(errors.noEmail);
    });

    it('renders the error block when password input touched and empty', () => {
        const password = appComponent.find('input').at(1);
        password.simulate('focus');
        password.simulate('blur');

        expect(appComponent.find(Error)).to.have.length(1);
        expect(appComponent.find(Error).render().text()).to.equal(errors.noPassword);
    });


    it('renders the error block when email input touched and value is invalid', () => {
        const email = appComponent.find('input').at(0);
        email.simulate('focus');
        email.prop('onChange')({target: {value: 'invalid_email.pl'}});
        email.simulate('blur');

        expect(appComponent.find(Error)).to.have.length(1);
        expect(appComponent.find(Error).render().text()).to.equal(errors.invalidEmail);
    });

    it('renders the error block when password input touched and value is invalid', () => {
        const password = appComponent.find('input').at(1);
        password.simulate('focus');
        password.prop('onChange')({target: {value: 'invalid_password'}});
        password.simulate('blur');

        expect(appComponent.find(Error)).to.have.length(1);
        expect(appComponent.find(Error).render().text()).to.equal(errors.invalidPassword);
    });

    it('renders the input-block', () => {
        expect(appComponent.find('.input-block')).to.have.length(2);
        expect(appComponent.find('.input-block').at(0).render().text()).to.equal('Email');
        expect(appComponent.find('.input-block').at(1).render().text()).to.equal('Password');
    });

});

describe('Functions tests', () => {
    it('returns false for invalid emails', () => {
        [
            'plainaddress',
            '#@%^%#$@#$@#.com',
            '@example.com',
            'Joe Smith <email@example.com>',
            'email.example.com',
            'email@example@example.com',
            '.email@example.com',
            'email.@example.com',
            'email..email@example.com',
            'あいうえお@example.com',
            'email@example.com (Joe Smith)',
            'email@example',
            'email@-example.com',
            'email@example..com',
            'Abc..123@example.com'
        ].forEach(email => {
            expect(isEmailValid(email)).to.equal(false);
        });
    });

    it('returns true for valid emails', () => {
        [
            'email@example.com',
            'firstname.lastname@example.com',
            'email@subdomain.example.com',
            'email@123.123.123.123',
            '1234567890@example.com',
            'email@example-one.com',
            '_______@example.com',
            'email@example.name',
            'email@example.museum',
            'email@example.co.jp',
            'firstname-lastname@example.com'
        ].forEach(email => {
            expect(isEmailValid(email)).to.equal(true);
        });
    });

    it('returns false for invalid passwords', () => {
        [
            'plainpassword',
            'plainpassword1',
            '#@%^%#$@#$@#',
            '#@%^%#$@#$@#1',
            'Joe Smith <pass>',
            'あいうえおpass',
            'PASSWORD'
        ].forEach(password => {
            expect(isPasswordValid(password)).to.equal(false);
        });
    });

    it('returns true for valid passwords', () => {
        [
            'Password1',
            'Aa#@%^%#$@#$@#1',
            'Joe Smith <pass 111>',
            '1あいうえおpasS',
            'PASSW0Rd'
        ].forEach(password => {
            expect(isPasswordValid(password)).to.equal(true);
        });
    });
});