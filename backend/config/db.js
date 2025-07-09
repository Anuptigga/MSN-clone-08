import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_STR

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connection successful !")
    } catch (error) {
        console.error("Connection Failed", error)
        process.exit(1)
    }
}

export default connectDB;