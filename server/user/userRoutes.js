/**
 * @description Contains User routes
 */
const router = require('express').Router();
const AuthMiddleware = require('../middleware/auth');
const APIController = require('./api/api.controller');

router.get('/', (req, res) => {
    res.send({
        status: 0,
        data: Date.now(),
        message: 'Hello, There!'
    });
});
router.route('/me')
    .get(AuthMiddleware.user, new APIController().getMyAccount);

module.exports = router;
