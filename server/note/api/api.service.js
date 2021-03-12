const ApiValidator = require('./api.validator');
const NoteModel = require('../../models/note.model');

/**
 * @description Class represents services for User APIs
 */
class ApiService {

    /**
     * @description Get all notes belonging to a user by pagination
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<Object>}
     */
    getAllNotes (req, res) {
        return new Promise((resolve, reject) => {
            const limit = isNaN(req.query.limit) ? 20 : Number(req.query.limit);
            const page = isNaN(req.query.page) ? 0 : Number(req.query.page);

            NoteModel.aggregate([
                {
                    $match: {
                        userId: db.Types.ObjectId(res.locals.me._id)
                    }
                },
                {
                    $facet: {
                        list: [{
                            $sort: {
                                createdAt: -1
                            }
                        }, {
                            $skip: limit * page
                        }, {
                            $limit: limit
                        }],
                        total: [
                            {
                                $count: 'count'
                            }
                        ]
                    }
                }
            ]).then(result => {
                const response = {
                    list: [],
                    total: 0,
                    page,
                    limit
                };
                if (result.length) {
                    response.list = result[0].list || [];
                    response.total =
                        result[0].total &&
                        result[0].total[0] &&
                        result[0].total[0].count ?
                            result[0].total[0].count : 0;
                }
                resolve(response);
            }).catch(reject);
        });
    }

    /**
     * @description Get a particular user note using note ID
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<Object>}
     */
    getNote (req, res) {
        return new Promise((resolve, reject) => {
            const id = req.params.id;
            if (db.Types.ObjectId.isValid(id)) {
                NoteModel.findOne({
                    _id: id,
                    userId: db.Types.ObjectId(res.locals.me._id)
                }).then(note => {
                    if (note) {
                        resolve(note);
                    } else {
                        reject(res.__('NOTE_NOT_FOUND'));
                    }
                }).catch(reject);
            } else {
                reject(res.__('NOTE_NOT_FOUND'));
            }
        });
    }

    /**
     * @description Delete a note belong to a user
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<void>}
     */
    deleteNote (req, res) {
        return new Promise((resolve, reject) => {
            const id = req.params.id;
            if (db.Types.ObjectId.isValid(id)) {
                NoteModel.findOneAndRemove({
                    _id: id,
                    userId: db.Types.ObjectId(res.locals.me._id)
                }).then(result => {
                    result ? resolve() : reject(res.__('NOTE_NOT_FOUND'));
                }).catch(reject);
            } else {
                reject(res.__('NOTE_NOT_FOUND'));
            }
        });
    }

    /**
     * @description Create a new note for a user
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<void>}
     */
    createNote (req, res) {
        return new Promise((resolve, reject) => {
            const Validator = new ApiValidator(req.body, res);
            // Validate request with input data
            Validator.validateNewNote().then(() => {
                return NoteModel.create({
                    header: req.body.noteHeader,
                    note: req.body.note,
                    userId: db.Types.ObjectId(res.locals.me._id)
                });
            }).then(() => {
                resolve();
            }).catch(reject);
        });
    }

    /**
     * @description Edit a note using note ID
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<void>}
     */
    editNote (req, res) {
        return new Promise((resolve, reject) => {
            const id = req.params.id;
            if (db.Types.ObjectId.isValid(id)) {
                const Validator = new ApiValidator(req.body, res);
                // Validate request with input data
                Validator.validateNewNote().then(() => {
                    return NoteModel.findOne({
                        _id: id,
                        userId: db.Types.ObjectId(res.locals.me._id)
                    });
                }).then(note => {
                    if (note) {
                        note.header = req.body.noteHeader;
                        note.note = req.body.note;
                        note.save(err => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        reject(res.__('NOTE_NOT_FOUND'));
                    }
                }).catch(reject);
            } else {
                reject(res.__('NOTE_NOT_FOUND'));
            }
        });
    }
}

module.exports = ApiService;
