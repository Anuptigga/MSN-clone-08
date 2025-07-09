import mongoose from "mongoose"

const newsSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    image:{type:String,required:true},
    category:{type:String, enum:['Sports','Politics','Tech','Entertainment','Shopping'], required:true},
    isTrending:{type:Boolean,default:false}
},
{timestamps:true}
)

const News = mongoose.model('news',newsSchema)
export default News;