import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const AlbumShema = new mongoose.Schema(
  {
    
    imageUrl: { type: String, require: true },
    album: { type: String, require: true },
    name: { type: String, require: true },
    title: { type: String, require: true },
    views: { type: String, require: true },
    star: { type: String, require: true },
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

const Album = mongoose.model('AlbumVideo', AlbumShema)

export default Album
