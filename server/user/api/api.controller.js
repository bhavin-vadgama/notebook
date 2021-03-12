const APIService = require('./api.service');
const Utils = require('../../util/utilFunctions');

/**
 * @description Class represents controller for User APIs
 */
class ApiController {

    /**
     * @description Get my profile details
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async getMyAccount (req, res, next) {
        try {
            const data = await new APIService()
                .getMyAccount(req, res);
            Utils.sendResponse(null, data, res, 'SUCCESS');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }
}

module.exports = ApiController;
