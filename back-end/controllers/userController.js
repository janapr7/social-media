const db = require("../config/db");

async function getUser(req, res){
    const user_id = req.params.user_id;
    db.query(
        `select * from users
        where id = ${db.escape(user_id)};`,
        (err, result) => {
            if(err) res.status(400).send(err);
            res.send({
                status: 200,
                data: result[0]
            })
        }
    )
}

async function getUserData(req, res){
    const user_id = req.params.user_id;
    db.query(
        `select full_name, bio, profile_pic, users.username, users.email from user_profiles
        join users on user_profiles.user_id=users.id where user_id = ${db.escape(user_id)};`,
        (err, result) => {
            if(err) res.status(400).send(err);
            res.send({
                status: 200,
                data: result[0]
            })
        }
    )
}

async function editUserProfile(req, res){
    db.query(
        `update user_profiles set ? where user_id = ?`,
        [req.body, req.params.user_id],
        (err) => {
            if (err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "User profile updated",
            });
        }
    );
}

async function editUsername(req, res){
    db.query(
        `update users set ? where id = ?`,
        [req.body, req.params.id],
        (err) => {
            if (err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "Username updated",
            });
        }
    );
}

async function editProfilePicture(req, res){
    let fileUploaded = req.file;
    let user_id = req.body.idToken;
    db.query(
        `update user_profiles set profile_pic = ${db.escape(fileUploaded.filename)}
        where user_id = ${user_id};`,
        (err) => {
            if(err) res.status(400).send(err);
        }
    )

    res.json({
        status: true,
        message: 'Profile picture successfully changed',
    });
}

module.exports = {
    getUser,
    getUserData,
    editUserProfile,
    editUsername,
    editProfilePicture
}