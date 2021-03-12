const Crypt = require('../../util/crypt');
const JWT = require('../../util/jwt');
const signInValidator = require('./signin.validator');
const User = require('../../models/user.model');

/**
 * @description Class represents services for Sign-in
 */
class SigninService {

    /**
     * @description Sign in request using email address and password
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<Object>}
     */
    signIn (req, res) {
        return new Promise((resolve, reject) => {
            const Validator = new signInValidator(req.body, res);
            // Validate request with input data
            Validator.validateSignin().then(() => {
                this.userLogin(
                    req.body.email,
                    req.body.password,
                    res
                ).then(resolve).catch(reject);
            }).catch(reject);
        });
    }

    /**
     * @description Check for email existence and password comparison
     * @param {string} userEmail
     * @param {string} password
     * @param {Object} res response
     * @returns {Promise<Object>}
     */
    userLogin (userEmail, password, res) {
        return new Promise((resolve, reject) => {
            User.findOne({
                'email.value': userEmail,
                'email.isPrimary': true
            }).then(userData => {
                // If user exists, verified and active then only verify password
                if (userData && userData.active && userData.email.isVerified) {
                    Crypt.comparePassword(
                        password,
                        userData.password,
                        (error, isMatch) => {
                            if (error || !isMatch) {
                                reject(res.__('LOGIN_FAIL'));
                            } else {
                                this.getUserToken(userData)
                                    .then(resolve)
                                    .catch(reject);
                            }
                        });
                // If user exists but is not verified
                } else if (userData && !userData.email.isVerified) {
                    reject(res.__('ACCOUNT_VERIFICATION_PENDING'));
                // If user exists but not active or deactivated by admin
                } else if (userData && !userData.active) {
                    reject(res.__('ACCOUNT_DISABLED'));
                // User does not exists
                } else {
                    reject(res.__('LOGIN_FAIL'));
                }
            }).catch(reject);
        });
    }

    /**
     * @description Function to generate JWT access token
     * @param {Object} user
     * @returns {Promise<Object>}
     */
    getUserToken (user) {
        return new Promise((resolve) => {
            const token = JWT.generate({
                id: user._id
            });
            resolve({
                accessToken: token
            });
        });
    }
}

module.exports = SigninService;
