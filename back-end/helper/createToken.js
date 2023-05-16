const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: '10m'
        })
    }
}