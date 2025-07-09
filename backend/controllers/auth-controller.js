import User from "../models/user-Model.js"

 export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password do not match!" });
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ message: "Email already exist" })
        }
        const createUser = await User.create({ firstName, lastName, email, password })
        const token = await createUser.generateToken()
        res.cookie("token", token, { expires: new Date(Date.now() + 3600000) })
        return res.status(200).json({
            message: "Registration successfull",
            user: {
                id: createUser._id,
                firstName: createUser.firstName,
                lastName: createUser.lastName,
                email: createUser.email,
                isAdmin: createUser.isAdmin
            },
            token: token

        })

    } catch (error) {
        return res.status(400).json({ message: "Page not found" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const verifiedPassword = await userExist.comparePassword(password)
        if (verifiedPassword) {
            const token = await userExist.generateToken()
            res.cookie("token", token, { expires: new Date(Date.now() + 3600000) })
            return res.status(200).json({
                message: "login successfully",
                token: token,
                userId: userExist._id.toString()
            })
        } else {
            return res.status(400).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", null, { expire: new Date(Date.now()) })
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const users = async (req, res) => {
    try {
        const users = req.user
        return res.status(200).json({ data: users })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}