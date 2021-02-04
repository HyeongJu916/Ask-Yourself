const jwt           = require("jsonwebtoken");
const EXPIRE_TERM   = 7199;
const SECRET        = "askyourselfjsonsecret";

module.exports = {
    createJWT: (uid, id) => {
        const payload   = {
            uid,
            id,
        };
        const secret    = SECRET;
        const options   = {
            expiresIn: EXPIRE_TERM,
        };
        return jwt.sign(payload, secret, options);
    },
    verifyJWT: (token) => {

        const item = {
            payload: {},
            isValid: true,
        }

        try {
            item.payload = jwt.verify(token, SECRET);
        } catch(error) {
            
            if(error.name === "TokenExpiredError")
                console.log("JWT 만료");

            else if(error.name === "JsonWebTokenError")
                console.log(error.message);

            else if(error.name === "NotBeforeError")
                console.log("nbf 오류");

            item.isValid = false;

        } finally {
            return item;
        }
    },
};

