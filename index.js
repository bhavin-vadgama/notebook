'use strict';
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: `${env}.env` });

// Global variables
global.logger = require('./server/util/logger');

const app = require('./server/server');
const port = process.env.PORT ? process.env.PORT : '8001';

module.exports = app.listen(port, () => {
    logger.info(`Server is started at : ${port}`);
    logger.info(`Swagger/API doc : ${process.env.BASE_URL}/docs`);
});
