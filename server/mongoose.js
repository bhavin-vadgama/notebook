/**
 * @description Mongoose configuration file
 * @type {module:mongoose}
 */

// Global Variable db
global.db = require('mongoose');

/* mongo configuration */
const mongoHost = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
const mongoUserPassword = process.env.DB_USERNAME ?
    `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@`
    : '';
const dbUrl = `mongodb://${mongoUserPassword}${mongoHost}`;
const options = {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

(() => {
    db.connect(dbUrl, options).then(() => {
        logger.info('MongoDB is connected');
    }).catch((err) => {
        logger.info(err);
        logger.info('MongoDB connection unsuccessful, retry after 5 seconds.');
    });
})();
