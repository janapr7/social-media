const router = require("express").Router();
const { userController } = require("../controllers");
const { multerUpload  } = require("../middleware/multer")

router.get("/data/:user_id", userController.getUserData);
router.get("/:user_id", userController.getUser);

router.patch("/profile-pic", multerUpload.single('file'), userController.editProfilePicture);
router.patch("/username/:id", userController.editUsername);
router.patch("/:user_id", userController.editUserProfile);

module.exports = router;