/**
 * @description SignUp APIs Swagger
 */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {
    swaggerJson.paths['/auth/signup'] = {
        'post': {
            'tags': [
                'Authentication'
            ],
            'description': 'User sign up using first name, last name, email and password',
            'summary': 'User sign up using first name, last name, email and password',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/userSignUp'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successUserRegister'
                    }
                },
                '400': {
                    'description': 'Validation failed',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
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

    swaggerJson.definitions.userSignUp = {
        'type': 'object',
        'properties': {
            'firstName': {
                'type': 'string',
                'example': 'Sam'
            },
            'lastName': {
                'type': 'string',
                'example': 'Jones'
            },
            'email': {
                'type': 'string',
                'example': 'sam@somedomain.com'
            },
            'password': {
                'type': 'string',
                'example': 'User@123'
            }
        }
    };

    swaggerJson.definitions.successUserRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.SIGNUP_SUCCESS
            }
        }
    };

    swaggerJson.definitions.errorUserRegister = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.ALREADY_REGISTER
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
