/**
 * @name User APIs Swagger
 */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {

    swaggerJson.paths['/user/me'] = {
        'get': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['User'],
            'description': 'Get my profile details',
            'summary': 'Get my profile details',
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successGetMe'
                    }
                },
                '400': {
                    'description': 'Validation failed',
                    'schema': {
                        '$ref': '#/definitions/failGetMe'
                    }
                },
                '401': {
                    'description': 'Unauthorized',
                    'schema': {
                        '$ref': '#/definitions/unauthorized'
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

    swaggerJson.definitions.successGetMe = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                'type': 'object',
                'example': {
                    'email': {
                        'value': 'bhavin@yopmail.com',
                        'isPrimary': true,
                        'isVerified': true,
                        '_id': '601eabd95db9fbd9c1d329dd'
                    },
                    'active': true,
                    '_id': '601eabd95db9fbd9c1d329de',
                    'firstName': 'bhavin',
                    'lastName': 'vadgama',
                    'createdAt': '2021-03-12 18:08:58.011Z',
                    'updatedAt': '2021-03-12 18:08:58.011Z'
                }
            },
            'message': {
                'example': message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.failGetMe = {
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

    swaggerJson.definitions.unauthorized = {
        properties: {
            status: {
                type: 'number',
                example: 0
            },
            message: {
                example: message.UNAUTHORIZED_ACCESS
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
