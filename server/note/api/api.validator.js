const validation = require('../../util/validation');

/**
 * @description Class represents validations for User APIs
 */
class ApiValidator extends validation {
    constructor (body, res) {
        super(body);
        this.body = body;
        this.res = res;
    }

    /**
     * @description Validate request body for new note
     * @returns {Promise<void>}
     */
    validateNewNote () {
        return new Promise((resolve, reject) => {
            this.noteHeader(this.body.noteHeader)
                .then(() => {
                    return this.note(this.body.note);
                })
                .then(() => {
                    return resolve();
                }).catch(reject);
        });
    }
}

module.exports = ApiValidator;
