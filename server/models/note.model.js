/**
 * @description Note collection model
 */
const UserModel = require('./user.model');
const Constants = require('../util/constant');

const schema = new db.Schema({
    header: {
        type: String,
        required: true,
        set: value => value.trim(),
        maxLength: Constants.LENGTH.NOTE_HEADER.MAX,
        minLength: Constants.LENGTH.NOTE_HEADER.MIN
    },
    note: {
        type: String,
        required: true,
        set: value => value.trim(),
        maxLength: Constants.LENGTH.NOTE.MAX,
        minLength: Constants.LENGTH.NOTE.MIN
    },
    userId: {
        type: db.Schema.Types.ObjectId,
        ref: UserModel.collection.collectionName,
        required: true
    }
}, {
    timestamps: true
});

const modelName = 'note';
const modelNameWithPrefix = process.env.NODE_ENV !== 'production' ?
    `${process.env.NODE_ENV}_${modelName}` : modelName;
module.exports = db.model(modelNameWithPrefix, schema);
