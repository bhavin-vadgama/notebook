/**
 * @name Note APIs Swagger
 */
const message = require('../../locales/en.json');
module.exports = (swaggerJson) => {

    swaggerJson.paths['/note/{id}'] = {
        'get': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['Note'],
            'description': 'Get a particular user note using note ID',
            'summary': 'Get a particular user note using note ID',
            'parameters': [
                {
                    'in': 'path',
                    'name': 'id',
                    'description': 'Note ID',
                    'required': true,
                    'type': 'string'
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successGetNote'
                    }
                },
                '400': {
                    'description': 'Validation failed',
                    'schema': {
                        '$ref': '#/definitions/failGetNote'
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
        },
        'put': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['Note'],
            'description': 'Edit a note using note ID',
            'summary': 'Edit a note using note ID',
            'parameters': [
                {
                    'in': 'path',
                    'name': 'id',
                    'description': 'Note ID',
                    'required': true,
                    'type': 'string'
                },
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/editNote'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successEditNote'
                    }
                },
                '400': {
                    'description': 'Validation failed',
                    'schema': {
                        '$ref': '#/definitions/errorEditNote'
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
        },
        'delete': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['Note'],
            'description': 'Delete a note using note ID belong to a user',
            'summary': 'Delete a note using note ID belong to a user',
            'parameters': [
                {
                    'in': 'path',
                    'name': 'id',
                    'description': 'Note ID',
                    'required': true,
                    'type': 'string'
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successRemoveNote'
                    }
                },
                '400': {
                    'description': 'Validation failed',
                    'schema': {
                        '$ref': '#/definitions/errorRemoveNote'
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

    swaggerJson.paths['/note'] = {
        'get': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['Note'],
            'description': 'Get all notes belonging to a user by pagination',
            'summary': 'Get all notes belonging to a user by pagination',
            'parameters': [
                {
                    'in': 'query',
                    'name': 'limit',
                    'required': false,
                    'type': 'number',
                    'example': 10,
                    'default': 20,
                    'description': 'Limit records per page'
                },
                {
                    'in': 'query',
                    'name': 'page',
                    'required': false,
                    'type': 'number',
                    'example': 2,
                    'default': 0,
                    'description': 'Page number starting from 0'
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successGetNotes'
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
        },
        'post': {
            'security': [
                {
                    'bearerAuth': []
                }
            ],
            'tags': ['Note'],
            'description': 'Create a new note for a user',
            'summary': 'Create a new note for a user',
            'parameters': [
                {
                    'in': 'body',
                    'name': 'body',
                    'description': 'Body parameter',
                    'required': true,
                    'schema': {
                        '$ref': '#/definitions/createNote'
                    }
                }
            ],
            'responses': {
                '200': {
                    'description': 'Success',
                    'schema': {
                        '$ref': '#/definitions/successCreateNote'
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

    swaggerJson.definitions.successGetNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                'type': 'object',
                'example': {
                    '_id': '604bb114d2864afab7c94aca',
                    'header': 'test header',
                    'note': 'text',
                    'userId': '604bae3a692e7bf7414a65be',
                    'createdAt': '2021-03-12T18:21:08.797Z',
                    'updatedAt': '2021-03-12T18:21:08.797Z',
                    '__v': 0
                }
            },
            'message': {
                'example': message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.failGetNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.NOTE_NOT_FOUND
            }
        }
    };

    swaggerJson.definitions.editNote = {
        'type': 'object',
        'properties': {
            'noteHeader': {
                'type': 'string',
                'example': 'test header'
            },
            'note': {
                'type': 'string',
                'example': 'some text'
            }
        }
    };

    swaggerJson.definitions.successEditNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.NOTE_EDITED
            }
        }
    };

    swaggerJson.definitions.errorEditNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.NOTE_NOT_FOUND
            }
        }
    };

    swaggerJson.definitions.successRemoveNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.NOTE_DELETED
            }
        }
    };

    swaggerJson.definitions.errorRemoveNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 0
            },
            'message': {
                'example': message.NOTE_NOT_FOUND
            }
        }
    };

    swaggerJson.definitions.successGetNotes = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                'type': 'object',
                'example': {
                    'list': [
                        {
                            '_id': '604bb114d2864afab7c94aca',
                            'header': 'Sam',
                            'note': 'Jones',
                            'userId': '604bae3a692e7bf7414a65be',
                            'createdAt': '2021-03-12T18:21:08.797Z',
                            'updatedAt': '2021-03-12T18:21:08.797Z',
                            '__v': 0
                        }
                    ],
                    'total': 1,
                    'page': 0,
                    'limit': 20
                }
            },
            'message': {
                'example': message.SUCCESS
            }
        }
    };

    swaggerJson.definitions.createNote = {
        'type': 'object',
        'properties': {
            'noteHeader': {
                'type': 'string',
                'example': 'test header'
            },
            'note': {
                'type': 'string',
                'example': 'some text'
            }
        }
    };

    swaggerJson.definitions.successCreateNote = {
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'message': {
                'example': message.NOTE_CREATED
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
