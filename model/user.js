import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    imageUrl: { type: String, require: true },
   
    isAdmin: { type: Boolean, default: false, require: true },
  
    
    followers: [{ type: ObjectId, ref: "User"}],
    following: [{ type:  ObjectId, ref: "User"}],
  },
  {
    timestamp: true,
  }
)

const User = mongoose.model('User', UserSchema)
export default User
