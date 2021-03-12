/**
 * @description SignIn APIs Swagger
 */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {
    swaggerJson.paths['/auth/signin'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'Log in via email and password',
            'summary': 'Log in via email and password',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Request body',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userSignIn'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successSignin'
                    }
                },
                '400': {
                    'description': 'Bad Request',
                    'schema': {
                        '$ref': '#/definitions/unauthorisedAccessEmail'
                    }
                },
                '500': {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpectedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.userSignIn = {
        'type': 'object',
        'properties': {
            'email': {
                'type': 'string',
                'example': 'name@somedomain.com'
            },
            'password': {
                'type': 'string',
                'example': 'User@123'
            }
        }
    };

    swaggerJson.definitions.successSignin = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                type: 'object',
                example: {
                    'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3' +
                        'QzMjFAbWFpbGluYXRvci5jb20iLCJpYXQiOjE1MjU0MzM3NDUsImV4cCI6MTU1Njk2OTc0NX0'
                }
            },
            'message': {
                'example': message.SIGNIN_SUCCESS
            }
        }
    };

    swaggerJson.definitions.unauthorisedAccessEmail = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.LOGIN_FAIL
            }
        }
    };

    swaggerJson.definitions.unexpectedError = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ERROR_MSG
            }
        }
    };
    return swaggerJson;
};
