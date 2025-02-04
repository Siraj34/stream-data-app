import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const CommentShema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    videoId: {
      type: String,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    postBy: {
      type: String,
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

    postBy: {
      type: ObjectId,
      ref: "User",
    },

  },
  { timestamps: true }
)

const Comment = mongoose.model('Comment', CommentShema)

export default Comment
