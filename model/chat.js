import mongoose from 'mongoose'



const ChatSchema = new mongoose.Schema(
  {
   
     
        name: { type: String, required: true },
        image: { type: String, require: true },
        user: { type: String, require: true },
        userName: { type: String, require: true },
        userEmail:{ type: String, require: true },
        chatId:{ type: String, require: true },
        postBy:{ type: String, require: true },
        videoId: { type: String, require: true },
        videoUrl: { type: String, require: true },
        musicName: { type: String, require: true },
        title:{ type: String, require: true },
        imageUrl:{ type: String, require: true },
        videoName: { type: String, require: true },
    
       

   
 
},
  {
    timestamps: true,
  }
)

const Chat = mongoose.model('Chat', ChatSchema)
export default Chat