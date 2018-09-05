import React from 'react';
import { expect } from 'chai';
import { isEmailValid, isPasswordValid } from './constants';
import '../shared/test-utils/setup';

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