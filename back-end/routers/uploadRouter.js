const router = require("express").Router();
const {uploadController} = require('../controllers')

router.post('/', uploadController.uploadFile);

module.exports = router;