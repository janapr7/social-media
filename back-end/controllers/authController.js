const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {} = require("../helper/createToken");
const {createToken} = require("../helper/createToken");
const transporter = require("../helper/nodemailer")

async function register(req, res){
    try{
        const {email, username, password, repeatPassword} = req.body;
        const is_verified = 0;

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        db.query(`start transaction;`)
        db.query(
            `insert into users(email, username, password, is_verified)
            values (${db.escape(email)}, ${db.escape(username)}, ${db.escape(hashPass)}, ${db.escape(is_verified)});`
        )

        const [last] = await db
        .promise()
        .query(`select last_insert_id() as id;`)

        const [userData] = await db
        .promise()
        .query(`select * from users where id=${db.escape(last[0].id)}`)

        const profile_pic = "default.jpg"

        db.query(
            `insert into user_profiles(full_name, bio, profile_pic, user_id)
            values("", "", ${db.escape(profile_pic)}, ${db.escape(last[0].id)})`
        )

        let idToken = userData[0].id
        let usernameToken = userData[0].username
        let emailToken = userData[0].email
        let isVerifiedToken = userData[0].is_verified
        let issuedDate = new Date()
        issuedDate = issuedDate.getTime()

        db.query(
            `insert into issued_date_tokens(get_time, user_id)
            values(${db.escape(issuedDate)}, ${db.escape(idToken)})`
        )

        let token = createToken({idToken, usernameToken, emailToken, isVerifiedToken, issuedDate})
        let mail = {
            from: `Social Media Admin <${process.env.EMAIL}>`,
            to:`${emailToken}`,
            subject: `Verify Account`,
            html:`<a href='http://localhost:3000/auth/${token}'>Click here to verify your account.</a>`
        }

        transporter.sendMail(mail, (errMail, resMail)=>{
            if(errMail){
                console.log(errMail)
                db.query(`rollback;`)
                res.status(500).send({message: "Can't send email verification.", success: false})
            }
            db.query(`commit;`)
            res.status(200).send({message: "Registration success, check your email inbox to verify.", success: true, token})
        })

        // res.status(200).send({
        //     status: true,
        //     data: {email, username, hashPass, is_verified},
        //     last_id:last[0],
        //     userData: userData[0],
        //     message: "Register success"
        // })

    } catch(err) {
        console.log(err);
        res.status(400).send(err)
    }
}

async function login(req, res){
    try{
        const {credential, password} = req.body;
        if(!credential || !password){
            // return res.status(400).send({message: "Required field cannot be empty."});
            throw("Required field cannot be empty.")
        }

        const [userData] = await db
        .promise()
        .query(`select * from users where email = ? or username = ?`, [credential, credential]);

        if(!userData.length){
            // return res.status(400).send({message: "Email or username not registered."});
            throw("Email or username not registered.")
        }

        const isValid = bcrypt.compareSync(password, userData[0].password);
        if(!isValid){
            // return res.status(400).send({message: "Password incorrect."});
            throw("Password incorrect.")
        }

        let idToken = userData[0].id
        let usernameToken = userData[0].username
        let emailToken = userData[0].email
        let isVerifiedToken = userData[0].is_verified
        let issuedDate = new Date()
        issuedDate = issuedDate.getTime()

        let token = createToken({idToken, usernameToken, emailToken, isVerifiedToken, issuedDate})

        db.query(
            `update issued_date_tokens set get_time = ${db.escape(issuedDate)} where user_id = ${db.escape(idToken)};`
        )

        const decoded = jwt.verify(token, process.env.SECRET);
        const userId = decoded.idToken  
        const issued = decoded.issuedDate

        return res.status(200).send({
            status: true,
            data: {
                token,
                // userId,
                // issued,
                // result:validDate[0]
            },
            message: "Login success"
        })

    } catch(err) {
        console.log(err);
        return res.status(400).send({message: err})
    }
}

// async function verification(req, res){
//     try{
//         db.query(
//             `update users set is_verified=1 where id = ${db.escape(req.user.idToken)};`
//         )

//         res.status(200).send({
//             status: true,
//             message: "Account succesfully verified."
//         })
//     } catch(err) {
//         console.log(err);
//         res.status(400).send(err)
//     }
// }

async function verification(req, res){
    let token = req.body.token
    const decoded = jwt.verify(token, process.env.SECRET);
    try{
        db.query(
            `update users set is_verified=1 where id = ${db.escape(decoded.idToken)};`
        )

        res.status(200).send({
            status: true,
            message: "Account succesfully verified."
        })
    } catch(err) {
        console.log(err);
        res.status(400).send(err)
    }
}

async function verifyToken(req, res){
    try{
        let token = req.body.token
        const decoded = jwt.verify(token, process.env.SECRET);

        let [result] = await db
        .promise()
        .query(`select * from issued_date_tokens where user_id=?`, decoded.idToken)

        if(decoded.issuedDate < result[0].get_time){
            return res.status(401).send("Authentication failed. Invalid token.")
        }

        res.status(200).send({
            status: true,
            message: "Token succesfully verified",
            data: decoded
        })
    } catch(err) {
        console.log(err);
        res.status(400).send(err)
    }


}


module.exports = {
    register,
    login,
    verification,
    verifyToken
}