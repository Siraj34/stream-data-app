import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const VideoShema = new mongoose.Schema(
  {
    
    imageUrl: { type: String, require: true },
    videoUrl: { type: String, require: true },
    album: { type: String, require: true },
    name: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
    user: { type: String, require: true },
    userName: { type: String, require: true },
    userEmail:{ type: String, require: true },
     

    videoId: {
      type: String,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
   

    tags: {
      type: [String],
      default: [],
    },

    
    views: {
      type: Number,
      default: 0,
    },
    
    comments:[{
      text:String,
      postBy:{type:ObjectId,ref:"User"}
  }],
    
    likes: [{ type: ObjectId, ref: "User" }],
   
    postBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  
    { timestamps: true }
  
)

const Video = mongoose.model('Video', VideoShema)

export default Video
