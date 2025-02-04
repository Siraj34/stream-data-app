import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'


const orderSchema = new mongoose.Schema(
  {
   
     
        name: { type: String, required: true },
        title: { type: String, required: true },
        videoUrl: { type: String, require: true },
        imageUrl: { type: String, require: true },
        user: { type: String, require: true },
        userName: { type: String, require: true },
        userEmail:{ type: String, require: true },
        postBy:{ type: String, require: true },
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

const Order = mongoose.model('Order', orderSchema)
export default Order