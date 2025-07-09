import "./config/env.js";
import express from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth-route.js";
import newsRoute from "./routes/newsRoute.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/news",newsRoute)

app.get("/", (req, res) => {
  res.send("<h1>Welcome To MSN</h1>");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server listening at Port No :", PORT);
  });
});
