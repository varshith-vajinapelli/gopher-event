const crypto = require("crypto");
const { generateAccessToken } = require("./auth.utils");

function generateQrToken(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        let randomInt = crypto.randomInt(0, chars.length)
        token += chars[randomInt]
    }

    return token
}



module.exports = {
    generateQrToken
}