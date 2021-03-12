/**
 * @description Class represents services for User APIs
 */
class ApiService {

    /**
     * @description Get my profile details
     * @param {Object} req HTTP request
     * @param {Object} res HTTP response
     * @returns {Promise<Object>}
     */
    getMyAccount (req, res) {
        return new Promise((resolve) => {
            const newUser = JSON.parse(JSON.stringify(res.locals.me));
            delete newUser.password;
            delete newUser.email.verification;
            resolve(newUser);
        });
    }
}

module.exports = ApiService;
