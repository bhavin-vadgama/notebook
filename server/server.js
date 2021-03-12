/**
 * @description Server Configuration
 */

const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const i18n = require('i18n');
const morgan = require('morgan');
const helmet = require('helmet');
const router = express.Router();
require('./mongoose');

router.get('/', (req, res) => {
    res.send({
        status: 0,
        data: Date.now(),
        message: 'Hello, There!'
    });
});

if (process.env.SWAGGER === 'true') {
    app.use('/jsdoc', express.static(`${__dirname}/../jsdocs/jsdocs`));
    app.use(
        '/auth/coverage',
        express.static(`${__dirname}/../coverage/lcov-report`)
    );
}

// Configure i18n for multilingual support
i18n.configure({
    locales: ['en'],
    directory: `${__dirname}/locales`,
    extension: '.json',
    prefix: '',
    logDebugFn (msg) {
        if (process.env.LOCAL_DB === 'true') {
            logger.debug(`'i18n::debug' ${msg}`);
        }
    }
});

app.use(compression());
app.use(helmet());
app.use(i18n.init);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    limit: '50mb', extended: true
}));
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));
app.use(methodOverride());

app.use('/', router);
app.use('/auth', require('./auth/authRoutes'));
app.use('/user', require('./user/userRoutes'));
app.use('/note', require('./note/noteRoutes'));
app.use(require('./middleware/exceptionHandler'));

if (process.env.SWAGGER === 'true') {
    require('./util/swagger')(router);
}
module.exports = app;
