import mongoose from 'mongoose'

const CommentShema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
)

const Update = mongoose.model('Update', CommentShema)

export default Update
