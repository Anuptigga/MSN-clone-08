require("dotenv").config()
const express = require("express")
const app = express();
const connectDB = require("./config/db")
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("<h1>Welcome To MSN</h1>")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server listening at Port No :", PORT)
    })
})