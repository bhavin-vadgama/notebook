/**
 * @description Contains Note routes
 */
const router = require('express').Router();
const AuthMiddleware = require('../middleware/auth');
const APIController = require('./api/api.controller');

router.route('/')
    .get(AuthMiddleware.user, new APIController().getAllNotes)
    .post(AuthMiddleware.user, new APIController().createNote);
router.route('/:id')
    .get(AuthMiddleware.user, new APIController().getNote)
    .put(AuthMiddleware.user, new APIController().editNote)
    .delete(AuthMiddleware.user, new APIController().deleteNote);

module.exports = router;
