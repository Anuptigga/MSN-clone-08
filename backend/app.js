require("dotenv").config()
const express = require("express")
const app = express();
const connectDB = require("./config/db")
const authRouter = require("./routes/auth-route")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser())
app.use("/api", authRouter)

app.get("/", (req, res) => {
    res.send("<h1>Welcome To MSN</h1>")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server listening at Port No :", PORT)
    })
})