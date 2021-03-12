const validation = require('../../util/validation');

/**
 * @description Class represents validations for Sign-up
 */
class SignupValidator extends validation {
    constructor (body, res) {
        super(body);
        this.body = body;
        this.res = res;
    }

    /**
     * @description This function is being used to validate request for signUp
     * @returns {Promise<void>}
     */
    validate () {
        return new Promise((resolve, reject) => {
            this.email(this.body.email)
                .then(() => {
                    return this.firstName(this.body.firstName);
                })
                .then(() => {
                    return this.lastName(this.body.lastName);
                })
                .then(() => {
                    return this.password(this.body.password);
                })
                .then(() => {
                    return resolve();
                })
                .catch(reject);
        });
    }
}

module.exports = SignupValidator;
