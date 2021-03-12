const validation = require('../../util/validation');

/**
 * @description Class represents validations for Sign-in
 */
class SigninValidator extends validation {
    constructor (body, res) {
        super(body);
        this.body = body;
        this.res = res;
    }

    /**
     * @description This function is being used to validate request for sign in
     * @returns {Promise<void>}
     */
    validateSignin () {
        return new Promise((resolve, reject) => {
            this.email(this.body.email)
                .then(() => {
                    return this.password(this.body.password);
                }).then(() => {
                    return resolve();
                }).catch(reject);
        });
    }
}

module.exports = SigninValidator;
