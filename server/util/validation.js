const Constant = require('./constant');
const Utils = require('./utilFunctions');

/**
 * @description Class represents basic validations methods
 */
class Validator {
    constructor (res) {
        this.res = res;
    }

    /**
     * @description This function is being used to validate firstname
     * @param {string} firstName
     */
    firstName (firstName) {
        return new Promise((resolve, reject) => {
            if (!firstName) {
                return reject(this.res.__('FIRSTNAME_REQUIRED'));
            }
            const hasValidPattern = Constant.REGEX.FIRSTNAME.test(firstName);
            const hasValidLength =
                Constant.LENGTH.NAME.MIN > firstName.trim().length
                || Constant.LENGTH.NAME.MAX < firstName.trim().length;
            return hasValidLength && hasValidPattern ?
                reject(this.res.__('FIRSTNAME_NOT_VALID')) : resolve();
        });
    }

    /**
     * @description This function is being used to validate lastName
     * @param {string} lastName
     */
    lastName (lastName) {
        return new Promise((resolve, reject) => {
            if (!lastName) {
                return reject(this.res.__('LASTNAME_REQUIRED'));
            }
            const hasValidPattern = Constant.REGEX.LASTNAME.test(lastName);
            const hasValidLength =
                Constant.LENGTH.NAME.MIN > lastName.trim().length
                || Constant.LENGTH.NAME.MAX < lastName.trim().length;
            return hasValidLength && hasValidPattern ?
                reject(this.res.__('LASTNAME_NOT_VALID')) : resolve();
        });
    }

    /**
     * @description This function is being used to validate email
     * @param {string} email
     */
    email (email) {
        return new Promise((resolve, reject) => {
            if (!email) {
                return reject(this.res.__('EMAIL_REQUIRED'));
            }
            const hasValidPattern = Constant.REGEX.EMAIL.test(email);
            const hasValidLength =
                Constant.LENGTH.EMAIL.MIN > email.trim().length
                || Constant.LENGTH.EMAIL.MAX < email.trim().length;
            return (hasValidLength || !hasValidPattern) ?
                reject(this.res.__('EMAIL_NOT_VALID')) : resolve();
        });
    }

    /**
     * @description This function is being used to validate password
     * @param {string} password
     */
    password (password) {
        return new Promise((resolve, reject) => {
            if (!password) {
                reject(this.res.__('PASSWORD_REQUIRED'));
            } else if (!Constant.REGEX.PASSWORD.test(password)) {
                reject(this.res.__('PASSWORD_VALIDATION'));
            } else {
                resolve();
            }
        });
    }

    /**
     * @description This function is being used to validate date if exists
     * @param {string} value
     * @returns {Promise<void>}
     */
    optionalDate (value) {
        return new Promise((resolve, reject) => {
            if (value) {
                if (!Utils.isValidDate(value)) {
                    reject(this.res.__('DATE_NOT_VALID'));
                }
            }
            resolve();
        });
    }

    /**
     * @description Validate Note header text
     * @param {string} value
     * @returns {Promise<void>}
     */
    noteHeader (value) {
        return new Promise((resolve, reject) => {
            if (!value || typeof value !== 'string') {
                return reject(this.res.__('NOTE_HEADER_REQUIRED'));
            }
            const hasValidLength =
                Constant.LENGTH.NOTE_HEADER.MIN > value.trim().length
                || Constant.LENGTH.NOTE_HEADER.MAX < value.trim().length;
            return hasValidLength ?
                reject(this.res.__('NOTE_HEADER_NOT_VALID')) : resolve();
        });
    }

    /**
     * @description Validate Note text
     * @param {string} value
     * @returns {Promise<void>}
     */
    note (value) {
        return new Promise((resolve, reject) => {
            if (!value || typeof value !== 'string') {
                return reject(this.res.__('NOTE_REQUIRED'));
            }
            const hasValidLength =
                Constant.LENGTH.NOTE.MIN > value.trim().length
                || Constant.LENGTH.NOTE.MAX < value.trim().length;
            return hasValidLength ?
                reject(this.res.__('NOTE_NOT_VALID')) : resolve();
        });
    }
}

module.exports = Validator;
