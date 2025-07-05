const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const authMiddleware = require("../middlewares/authMiddleware")


router.route("/register").post(authController.register)
router.route("/login").post(authController.login)
router.route("/users").get(authMiddleware, authController.users)
router.route("/logout").post(authController.logout)


module.exports = router;