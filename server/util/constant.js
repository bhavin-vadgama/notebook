module.exports = {
    REGEX: {
        EMAIL: /^[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+\.[A-Za-z]{2,}$/,
        PHONE: /^(\d{7,10})$/,
        COUNTRY_CODE: /^(\+?\d{1,3}|\d{1,4})$/,
        FIRSTNAME: /^[^<>?//\\]+$/,
        LASTNAME: /^[^<>?//\\]+$/,
        ALPHA_ONLY: /^[a-zA-Z']*$/,
        ALPHA_SPECIAL_CHAR: /^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$/,
        ALPHA_SPECIAL_CHAR_EXCEPT_NUMBER: /^[ A-Za-z_@./#&+-]*$/,
        FULL_ACCESS: /^[^<> ?//\\]+$/,
        ALPHA_NUMERIC: /^[\w@ ]+$/,
        /**
         * Minimum eight and maximum 20 characters,
         * at least one uppercase letter,
         * one lowercase letter,
         * one number and one special character
         */
        PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        MONGO_ID: /^[0-9a-fA-F]{24}$/,
        URL:
            /^((https?):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#_.-]+\/?)*$/
    },
    LENGTH: {
        NAME: {
            MIN: 2,
            MAX: 255
        },
        PASSWORD: {
            MIN: 8,
            MAX: 20
        },
        EMAIL: {
            MIN: 2,
            MAX: 255
        },
        NOTE_HEADER: {
            MIN: 1,
            MAX: 255
        },
        NOTE: {
            MIN: 1,
            MAX: 20000
        }
    }
};
