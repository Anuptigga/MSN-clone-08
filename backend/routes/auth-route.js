import express from "express"
const router = express.Router()
import {register,login,users,logout} from "../controllers/auth-controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

router.post("/register",register)
router.post("/login",login)
router.get("/users", authMiddleware, users)
router.post("/logout",logout)

export default router