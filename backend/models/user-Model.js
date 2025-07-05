const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRegistrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxLength: 14,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
//*Generate token//
userRegistrationSchema.methods.generateToken = async function () {

    const token = jwt.sign({
        userId: this._id.toString(),
        email: this.email
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "30d"
        }
    )
    return token;
}

//**Generate HashPassword */

userRegistrationSchema.pre("save", async function (next) {
    const salt = 10
    if (!this.isModified("password")) {
        next()
    }
    const hash_password = await bcrypt.hash(this.password, salt)
    this.password = hash_password
    this.confirmPassword = undefined;
    next()
})
//* compare passward/
userRegistrationSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userRegistrationSchema)


module.exports = User