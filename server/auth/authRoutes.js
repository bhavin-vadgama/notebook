/**
 * @description Contains Authentication routes
 */
const router = require('express').Router();
const SignUpController = require('./signup/signup.controller');
const SignInController = require('./signin/signin.controller');

router.get('/', (req, res) => {
    res.send({
        status: 0,
        data: Date.now(),
        message: 'Hello, There!'
    });
});
router.post('/signup', new SignUpController().signUp);
router.post('/signin', new SignInController().signIn);

module.exports = router;
