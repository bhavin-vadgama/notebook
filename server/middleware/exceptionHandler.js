/**
 * @description System level exception handler middleware
 */
const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');

module.exports = function (err, req, res, next) {
    if (!next) {
        res = req;
        req = err;
    }
    logger.error(err);
    const errResponse = Utils.exceptionResponse(res);
    if (next && process.env.LOG_LEVEL === 'debug') {
        errResponse.stackTrace = err.stack;
    }
    if (err.statusCode) {
        errResponse.message = err.message;
    }
    const statusCode = err.statusCode ?
        err.statusCode : HTTPStatus.INTERNAL_SERVER_ERROR;
    res.status(statusCode).send(errResponse);
};
