import express from "express"
import { uploadNews, getNews, getNewsById } from "../controllers/newsController.js"

const router= express.Router()

router.post("/",uploadNews)
router.get("/",getNews)
router.get("/:id",getNewsById)

export default router;