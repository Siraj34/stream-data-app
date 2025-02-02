import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const MovieShema = new mongoose.Schema(
  {
    
    imageUrl: { type: String, require: true },
    videoUrl: { type: String, require: true },
    album: { type: String, require: true },
    name: { type: String, require: true },
    title: { type: String, require: true },
    slug: { type: String, require: true },
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
      require:true,
    },
    comments: [
      {
        comment: { type: String },
        postBy: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],

    tags: {
      type: [String],
      default: [],
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    likedBy: [{
      type: ObjectId,
      ref: "User",
    }],
    
      dislikedBy: [{
        type: ObjectId,
        ref: "User",
      }],
    
      views: {
        type: Number,
        default: 0,
      },
   
    postBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  
    { timestamps: true }
  
)

const Movie = mongoose.model('Movie', MovieShema)

export default Movie
