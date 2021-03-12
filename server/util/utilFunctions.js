const HTTPStatus = require('../util/http-status');

/**
 * @description Class represents common utilities for an application
 */
class Utils {

    /**
     * @description Error response for bad request
     * @returns {Object}
     */
    static errorResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 0,
                data: {},
                message: ''
            })
        );
    }

    /**
     * @description Success response for 200 request
     * @returns {Object}
     */
    static successResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 1,
                data: {},
                message: ''
            })
        );
    }

    /**
     * @description Exception response if system throws any error
     * @param {Object} res response
     * @returns {{message: string, status: number}}
     */
    static exceptionResponse (res) {
        return {
            status: 0,
            message: res.__('ERROR_MSG')
        };
    }

    /**
     * @description Send response according to success or error with data if exists
     * @param {Object|string} error Error Message
     * @param {Object} data Object to send in response
     * @param {Object} res Response Object
     * @param {string} successMessage success message
     * @param {string} successMessageVars
     */
    static sendResponse (error, data, res, successMessage, successMessageVars = '') {
        let responseObject;
        if (error) {
            let status;
            responseObject = Utils.errorResponse();
            if (typeof error === 'object') {
                responseObject.message = error.message || successMessage;
                status = error[1] ? error[1] : HTTPStatus.BAD_REQUEST;
            } else {
                responseObject.message = error;
                status = HTTPStatus.BAD_REQUEST;
            }
            res.status(status).send(responseObject);
            return;
        }
        responseObject = Utils.successResponse();
        responseObject.message = successMessageVars
            ? res.__.apply('', [successMessage].concat(successMessageVars))
            : res.__(successMessage);
        responseObject.data = data;
        res.status(HTTPStatus.OK).send(responseObject);
    }

    /**
     * @description Generate unique timestamp based number
     * @returns {number}
     */
    static getUniqueTimestampBasedNumber () {
        return Math.floor(new Date().valueOf() * Math.random());
    }
}

module.exports = Utils;
