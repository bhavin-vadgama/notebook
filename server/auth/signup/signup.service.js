const Crypt = require('../../util/crypt');
const signUpValidator = require('./signup.validator');
const User = require('../../models/user.model');

/**
 * @description Class represents services for Sign-up
 */
class SignupService {

    /**
     * @description Signup request with information like email, first name, last name and password
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<void>}
     */
    signUp (req, res) {
        return new Promise((resolve, reject) => {
            const Validator = new signUpValidator(req.body, res);
            // Validate request with input data
            Validator.validate().then(() => {
                // Check if the user already exist on the system
                return User.findOne({
                    'email.value': req.body.email,
                    'email.isPrimary': true
                });
            }).then(user => {
                if (user) {
                    reject(res.__('ALREADY_REGISTER'));
                } else {
                    return Crypt.enCryptPassword(req.body.password);
                }
            }).then((hash) => {
                if (hash) {
                    req.body.password = hash;
                    this.createUser(req.body).then(() => {
                        resolve();
                    }).catch(reject);
                }
            }).catch(reject);
        });
    }

    /**
     * @description Create a new user on database
     * @param {Object} reqBody
     * @returns {Promise<Document>}
     */
    createUser (reqBody) {
        return User.create({
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            'email.value': reqBody.email,
            password: reqBody.password
        });
    }
}

module.exports = SignupService;
