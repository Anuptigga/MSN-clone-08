import jwt from "jsonwebtoken"
import User from "../models/user-Model.js"

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: "token not found" })
        }
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)
        if (!verifiedToken) {
            return res.status(400).json({ message: "Unauthorized Token" })
        }
        const payload = await User.findById(verifiedToken.userId).select("-password")
        req.user = payload
        req.token = token
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export default authMiddleware;