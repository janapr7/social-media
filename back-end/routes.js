const router = require("express").Router();
const { multerUpload } = require("./middleware/multer");

router.post('/profile-pic', multerUpload.single('file'), (req, res)=>{
    let fileUploaded = req.file;
    console.log(fileUploaded.filename);

    res.json({
        status: true,
        message: 'File uploaded'
    });
})

module.exports = router;