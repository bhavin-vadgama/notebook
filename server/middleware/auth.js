/**
 * @description Contains system level authentication middleWare
 */

const jwt = require('jsonwebtoken');
const Utils = require('../util/utilFunctions');
const User = require('../models/user.model');
const HTTPStatus = require('../util/http-status');

/**
 * @description Return unauthorized error with 401 response
 * @param {Object} res
 */
const unauthorised = function (res) {
    const responseObject = Utils.errorResponse();
    responseObject.message = res.__('UNAUTHORIZED_ACCESS');
    res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
};

/**
 * @description Check and find user from token object
 * @param {object} me me.id
 * @returns {Promise<Object>}
 */
const checkUser = (me) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: me.id })
            .then((userObj) => {
                if (!userObj) {
                    reject();
                } else {
                    resolve(userObj);
                }
            }).catch(reject);
    });
};

/**
 * @description Get token from request header
 * @param {Object} req req.headers.authorization
 * @returns {string}
 */
const getToken = (req) => {
    return req.headers.authorization;
};

/**
 * @description Verify JWT token
 * @param {string} token
 * @returns {Promise<Object>}
 */
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenDetail) => {
            if (err) {
                reject(err);
            } else {
                resolve(tokenDetail);
            }
        });
    });
};

/**
 * @description This function is being used to authenticate each private request to user
 * @param {Object} req Request req.headers req.headers.authorization accessToken
 * @param {Object} res Response
 * @returns {Promise<Object>}
 */
const userAuth = function (req, res) {
    return new Promise((resolve, reject) => {
        const token = getToken(req);
        verifyToken(token).then(tokenDetail => {
            checkUser(tokenDetail).then(user => {
                // Store the user in response object to use it later if needed
                res.locals.me = JSON.parse(JSON.stringify(user));
                resolve(tokenDetail);
            }).catch(reject);
        }).catch(reject);
    });
};

module.exports = {
    user (req, res, next) {
        userAuth(req, res).then(() => {
            next();
        }).catch(() => {
            unauthorised(res);
        });
    }
};
