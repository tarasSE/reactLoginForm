export default class MockAuthService {
    email = 'test@test.pl';
    password = 'Password1';

    login(email, password) {
        return new Promise((resolve, reject) => {
            if (this.email === email && this.password === password) {
                resolve({loginSuccessful: true});
                return;
            }
            reject({loginSuccessful: false});
        })
    }
}

export { MockAuthService };