const bcrypt = require('bcrypt');

/**
 * @method _bcryption: This method used to convert user password into bycrypted form
 * @param {String} pwd user password
 */
const _bcryption = async (pwd) => {
    try {
        const hash = await bcrypt.hash(pwd, 10);
        return hash;
    } catch (err) {
        console.log("_bcryption-err", err);
        return false;
    }
}

/**
 * @method changePassword: This method used to compare user entered with bycrypted password
 * @param {Object} passwords of user
 */
const _decryption = async (data) => {
    try {
        const { password, hash } = data;
        const isMatched = await bcrypt.compare(password, hash);
        return isMatched;
    } catch (err) {
        console.log("_decryption-err", err);
        return false;
    }
}

module.exports.bcryption = _bcryption;
module.exports.decryption = _decryption;