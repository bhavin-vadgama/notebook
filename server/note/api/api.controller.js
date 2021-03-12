const APIService = require('./api.service');
const Utils = require('../../util/utilFunctions');

/**
 * @description Class represents controller for User APIs
 */
class ApiController {

    /**
     * @description Get all notes belonging to a user by pagination
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async getAllNotes (req, res, next) {
        try {
            const data = await new APIService()
                .getAllNotes(req, res);
            Utils.sendResponse(null, data, res, 'SUCCESS');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }

    /**
     * @description Get a particular user note using note ID
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async getNote (req, res, next) {
        try {
            const data = await new APIService()
                .getNote(req, res);
            Utils.sendResponse(null, data, res, 'SUCCESS');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }

    /**
     * @description Create a new note for a user
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async createNote (req, res, next) {
        try {
            const data = await new APIService()
                .createNote(req, res);
            Utils.sendResponse(null, data, res, 'NOTE_CREATED');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }

    /**
     * @description Edit a note using note ID
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async editNote (req, res, next) {
        try {
            const data = await new APIService()
                .editNote(req, res);
            Utils.sendResponse(null, data, res, 'NOTE_EDITED');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }

    /**
     * @description Delete a note belong to a user
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @param {function} next next middleware function
     * @returns {Promise<void>}
     */
    async deleteNote (req, res, next) {
        try {
            const data = await new APIService()
                .deleteNote(req, res);
            Utils.sendResponse(null, data, res, 'NOTE_DELETED');
        } catch (error) {
            logger.error(error);
            typeof error === 'string' ?
                Utils.sendResponse(error, null, res, res.__(error)) :
                next(error);
        }
    }
}

module.exports = ApiController;
