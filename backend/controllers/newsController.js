import News from "../models/News.js";

//create
export const uploadNews = async(req,res)=>{
    try {
       const{title,description,image,isTrending}=req.body;
       const news= new News({
        title,
        description,
        image,
        isTrending
       })
       await news.save();
       res.status(200).json({message:"News posted successflly",news})
    } catch (error) {
        res.status(500).json({message:"Failed to upload news",error:error.message})
    }
}

//get News
export const getNews = async(req,res)=>{
    try {
        const news= await News.find()
        res.status(200).json({message:"News fetched successfully",news})
    } catch (error) {
      res.status(500).json({message:"Error,cannot get news",error:error.message})  
    }
}
//find by id
export const getNewsById = async(req,res)=>{
    try {
        const {newsId}=req.body
        const news = await News.findById(newsId)
        res.status(200).json({message:"News fetched successfully",news})
    } catch (error) {
        res.status(500).json({message:"Error,getting news",error:error.message})
    }
}