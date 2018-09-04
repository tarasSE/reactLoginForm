const errors = {
    noEmail: 'Email can\'t be empty',
    invalidEmail: 'Please enter valid email',
    noPassword: 'Password can\'t be empty',
    invalidPassword: 'The value of the password should be at least 6 characters long (including at least one upper case letter, one lower case and one number)',
    wrongCreds: 'Invalid login or password'
};

const isEmailValid = value => {
    return /^[^.]{1}\.?([\w\-_]+)?\.?\w+@[^-][\w-_]+(\.\w+){1,}$/igm.test(value);
};

const isPasswordValid = value => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
};

export { errors, isEmailValid, isPasswordValid };