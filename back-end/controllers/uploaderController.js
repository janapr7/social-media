const db = require('../config/db');
const {uploader} = require('../helper/uploader');
const fs = require("fs");

module.exports = ({
    uploadFile: (req, res) => {
        try {
            let path = '/images'
            const upload = uploader(path, 'IMG').fields([{name: 'file'}])
            upload(req, res, (error)=>{
                if(error){
                    console.log(error)
                    res.status(500).send(error)
                }

                const {file} = req.files
                const filepath = file ? path + '/' + file[0].filename : null

                let data = JSON.parse(req.body.data)
                data.image = filepath

                let sqlInsert = `insert into albums (image) values (${db.escape(filepath)})`
                db.query(sqlInsert, data, (err, result)=>{
                    if(err){
                        console.log(err)
                        fs.unlinkSync('./public'+filepath)
                        res.status(500).send(err)
                    }

                    res.status(200).send({message: "Picture uploaded"})
                })
            })
        } catch(error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
})

