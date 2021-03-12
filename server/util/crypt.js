const crypto = require('crypto');
// Must be 256 bytes (32 characters)
const ENCRYPTION_KEY = process.env.JWT_SECRET;
// For AES, this is always 16
const IV_LENGTH = 16;

class Crypt {
    static enCryptPassword (password) {
        return new Promise((resolve) => {
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto
                .createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(password);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve((iv.toString('hex') + ':' + encrypted.toString('hex')));
        });
    }

    static comparePassword (compare, original, callback) {
        try {
            const textParts = original.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto
                .createDecipheriv(
                    'aes-256-cbc',
                    Buffer.from(ENCRYPTION_KEY),
                    iv
                );
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            (compare === (decrypted.toString()))
                ? callback(null, true) : callback(null, false);
        } catch (error) {
            callback(null, false);
        }
    }
}

module.exports = Crypt;
