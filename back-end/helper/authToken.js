const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../config/db");

module.exports = {
    auth: (req, res, next)=>{
        jwt.verify(req.token, process.env.SECRET, async (err, decode)=>{
            if(err){
                return res.status(401).send("Authentication failed. Invalid token.")
            }

            console.log(decode.idToken)
            let [result] = await db
            .promise()
            .query(`select * from issued_date_tokens where user_id=?`, decode.idToken)

            if(decode.issuedDate < result[0].get_time){
                return res.status(401).send("Authentication failed. Invalid token.")
            }

            req.user = decode
            console.log(decode.issuedDate == result[0].get_time)
            next()
        })
    }
}