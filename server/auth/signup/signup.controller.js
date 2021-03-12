const SignUpService = require('./signup.service');
const Utils = require('../../util/utilFunctions');

/**
 * @description Class represents controller for Sign-up
 */
class SignupController {

    /**
     * @description Signup request with information like email, first name, last name and password
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async signUp (req, res, next) {
        try {
            const data = await new SignUpService().signUp(req, res);
            Utils.sendResponse(null, data, res, 'SIGNUP_SUCCESS');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }
}

module.exports = SignupController;
