/**
 * @description Swagger Configuration file
 */

const swaggerUi = require('swagger-ui-express');
let swaggerJson = require('../public/swagger.json');

// authentication
swaggerJson = require('../auth/signup/signup.swagger')(swaggerJson);
swaggerJson = require('../auth/signin/signin.swagger')(swaggerJson);
// user
swaggerJson = require('../user/api/api.swagger')(swaggerJson);
// note
swaggerJson = require('../note/api/api.swagger')(swaggerJson);

const baseURL = process.env.BASE_URL.split('://');
swaggerJson.host = baseURL[1];
swaggerJson.info.description = `HostName / URL : ${swaggerJson.host}`;
swaggerJson.schemes[0] = baseURL[0];

const options = {
    swaggerOptions: {
        displayRequestDuration: true
    }
};

module.exports = function (router) {
    router.get('/swagger', (req, res) => {
        res.json(swaggerJson);
    });
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerJson, options));
};
