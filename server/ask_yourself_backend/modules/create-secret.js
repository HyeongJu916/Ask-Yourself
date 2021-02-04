const crypto = require("crypto");

const CRYPTO_SECRET = "askyourselfman";

module.exports = {
    createHash(secret) {
        return crypto.createHash("sha256").update(secret).digest("base64");
    },
};