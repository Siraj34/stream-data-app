import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'


const PlayListSchema = new mongoose.Schema(
  {
   
     
        name: { type: String, required: true },
        title: { type: String, required: true },
        videoUrl: { type: String, require: true },
        imageUrl: { type: String, require: true },
        user: { type: String, require: true },
        userName: { type: String, require: true },
        userEmail:{ type: String, require: true },
        movieId:{ type: String, require: true },
        postBy:{ type: String, require: true },
        chatId:{ type: String, require: true },
        musicName:{ type: String, require: true },
        image: {
          type: String,
          require:true,
    
       
      },
    
      comments:[{
        text:String,
        postBy:{type:ObjectId,ref:"User"}
    }],

    postBy: {
      type: ObjectId,
      ref: "User",
    },

   

   
 
},
  {
    timestamps: true,
  }
)

const PlayList = mongoose.model('PlayList', PlayListSchema)
export default PlayList