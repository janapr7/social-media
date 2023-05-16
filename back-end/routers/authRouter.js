const router = require("express").Router();
const { authController } = require("../controllers");
const { auth } = require("../helper/authToken");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", auth, authController.verification);
router.post("/verify-token", authController.verifyToken);

module.exports = router;