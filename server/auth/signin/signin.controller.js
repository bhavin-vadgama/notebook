const SignInService = require('./signin.service');
const Utils = require('../../util/utilFunctions');

/**
 * @description Class represents controller for Sign-in
 */
class SigninController {

    /**
     * @description Sign in request using email address and password
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async signIn (req, res, next) {
        try {
            const data = await new SignInService().signIn(req, res);
            Utils.sendResponse(null, data, res, 'SIGNIN_SUCCESS');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }
}

module.exports = SigninController;
