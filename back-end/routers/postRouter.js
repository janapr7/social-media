const router = require("express").Router();
const { postController } = require("../controllers");
const { multerUpload } = require("../middleware/multer")

router.get("/", postController.getPost);
router.get("/user/:user_id", postController.getUserPost);
router.get("/comment/:post_id", postController.getComment)
router.get("/:id", postController.getPostDetail);

router.post("/", postController.sendPost);
router.post("/comment", postController.sendComment);
router.post("/create", multerUpload.single('file'), postController.createPost);

router.patch("/:id", postController.editPost);

router.delete("/:id", postController.deletePost)

module.exports = router;