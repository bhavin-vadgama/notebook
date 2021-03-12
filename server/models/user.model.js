/**
 * @description User collection model
 */
const Constants = require('../util/constant');

const schema = new db.Schema({
    firstName: {
        type: String,
        required: true,
        set: value => value.trim().toLowerCase(),
        maxLength: Constants.LENGTH.NAME.MAX,
        minLength: Constants.LENGTH.NAME.MIN
    },
    lastName: {
        type: String,
        required: true,
        set: value => value.trim().toLowerCase(),
        maxLength: Constants.LENGTH.NAME.MAX,
        minLength: Constants.LENGTH.NAME.MIN
    },
    email: {
        type: new db.Schema({
            value: {
                type: String,
                default: '',
                set: value => value.trim().toLowerCase(),
                maxLength: Constants.LENGTH.NOTE_HEADER.MAX
            },
            isPrimary: {
                type: Boolean,
                default: true
            },
            isVerified: {
                type: Boolean,
                default: true
            },
            verification: {
                type: new db.Schema({
                    code: {
                        type: String,
                        set: value => value.trim()
                    },
                    expiresAt: {
                        type: Date
                    }
                })
            }
        }),
        default: {},
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    timestamps: true
});

const modelName = 'user';
const modelNameWithPrefix = process.env.NODE_ENV !== 'production' ?
    `${process.env.NODE_ENV}_${modelName}` : modelName;
module.exports = db.model(modelNameWithPrefix, schema);
