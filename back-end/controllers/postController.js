const db = require("../config/db");

async function getPost(req, res){
    const {page} = req.body;
    db.query(
            `SELECT posts.id, caption, like_count, post_date, posts.user_id, photo, users.username, user_profiles.full_name FROM posts
            join users on users.id = posts.user_id
            join user_profiles on users.id = user_profiles.user_id
            order by post_date desc;`,
            (err, result) => {
                if(err) res.status(400).send(err);
                res.send({
                    status: 200,
                    data: result
                })
            }
        )
}

async function getComment(req, res){
    db.query(
            `SELECT comment, comment_date, user_id, users.username FROM comments
            join users on users.id = comments.user_id
            where post_id = ${req.params.post_id}
            order by comment_date;`,
            (err, result) => {
                if(err) res.status(400).send(err);
                res.send({
                    status: 200,
                    data: result
                })
            }
        )
}

async function getUserPost(req, res){
    // const {user_id} = req.body;
    const user_id = req.params.user_id
    // const user_id = req.params.userId
    db.query(
            `SELECT posts.id, caption, like_count, post_date, posts.user_id, photo, users.username, user_profiles.full_name FROM posts
            join users on users.id = posts.user_id
            join user_profiles on users.id = user_profiles.user_id
            where posts.user_id = ${db.escape(user_id)}
            order by post_date desc;`,
            (err, result) => {
                if(err) res.status(400).send(err);
                res.send({
                    status: 200,
                    data: result
                })
            }
        )
}


async function getPostDetail(req, res){
    db.query(
            `SELECT posts.id, caption, like_count, post_date as day_posted, posts.user_id, photo, users.username, user_profiles.full_name FROM posts
            join users on users.id = posts.user_id
            join user_profiles on users.id = user_profiles.user_id
            where posts.id = ${req.params.id}`,
            (err, result) => {
                if(err) res.status(400).send(err);
                res.send({
                    status: 200,
                    data: result[0]
                })
            }
        )
}

async function sendPost(req, res){
    const {photo, caption, post_date, user_id} = req.body;
    const like_count = 0;
    db.query(
        `insert into posts(photo, caption, post_date, like_count, user_id) values (${db.escape(photo)}, ${db.escape(caption)}, ${db.escape(post_date)}, ${db.escape(like_count)}, ${db.escape(user_id)});`,
        (err) => {
            if(err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "Posted succesfuly",
                data: {photo, caption, post_date, like_count, user_id}
            })
        }
    )
}

async function sendComment(req, res){
    const {comment, comment_date, post_id, user_id} = req.body;
    db.query(
        `insert into comments(comment, comment_date, post_id, user_id) values (${db.escape(comment)}, ${db.escape(comment_date)}, ${db.escape(post_id)}, ${db.escape(user_id)});`,
        (err) => {
            if(err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "Posted succesfuly",
                data: {comment, comment_date, post_id, user_id}
            })
        }
        )
}

async function editPost(req, res){
    db.query(
        `update posts set ? where id = ?`,
        [req.body, req.params.id],
        (err) => {
            if (err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "Post updated",
            });
        }
    );
}

async function deletePost(req, res){
    db.query(
        `delete from posts where id = ?`,
        [req.params.id],
        (err) => {
            if (err) res.status(400).send(err);
            res.send({
                status: 200,
                message: "Post deleted",
            });
        }
    );
}

async function createPost(req, res){
    let fileUploaded = req.file;
    let caption = req.body.caption
    const likeCount = 0;
    const date = new Date()
    const userId = req.body.userId
    db.query(
        `insert into posts(photo, caption, post_date, like_count, user_id) values (${db.escape(fileUploaded.filename)}, ${db.escape(caption)}, ${db.escape(date)}, ${db.escape(likeCount)}, ${db.escape(userId)});`,
        (err) => {
            if(err) res.status(400).send(err);
        }
    )

    res.json({
        status: true,
        message: 'File successfully uploaded',
        data: {photo: fileUploaded.filename, caption, post_date: date, like_count: likeCount, user_id: userId},
    });
}

//todo: like?

module.exports = {
    getPost,
    getUserPost,
    getPostDetail,
    sendPost,
    sendComment,
    editPost,
    deletePost,
    getComment,
    createPost
};