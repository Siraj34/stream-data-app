import express from 'express'
import Comment from '../model/comment.js'
import { isAuth } from '../generetison.js'
import Video from '../model/video.js'

const CommentRouter = express.Router()

CommentRouter.post('/post',async (req, res) => {
  const newComment = new Comment({ ...req.body, userId: req.user })
  try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment)
  } catch (err) {
    console.log(err)
  }
})

CommentRouter.get('/get/:id',async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.id })
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
})

CommentRouter.get('/get/', async (req, res) => {
  try {
    const comments = await Comment.find()
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
})

CommentRouter.post('/like/:postId/:userId', async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.params.userId

    const postExist = await Video.findById(postId)
    const userExist = await User.findById(userId)

    if (!postExist) {
      return res.status(400).json({ message: 'Post Video not found' })
    }
    if (!userExist) {
      return res.status(400).json({ message: 'User Video not found' })
    }

    if (postExist.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' })
    }
    if (postExist.dislikedBy.includes(userId)) {
      postExist.dislikedBy.pull(userId)
      postExist.dislikes -= 1
    }

    postExist.likedBy.push(userId)
    postExist.likes += 1

    const saveLike = await postExist.save()
    res.status(200).json(saveLike)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

CommentRouter.post('/dislike/:postId/:userId', async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.params.userId

    const postExist = await Video.findById(postId)
    const userExist = await User.findById(userId)

    if (!postExist) {
      return res.status(400).json({ message: 'Post Video not found' })
    }
    if (!userExist) {
      return res.status(400).json({ message: 'User Video not found' })
    }

    if (postExist.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: 'Post already disliked' })
    }
    if (postExist.likedBy.includes(userId)) {
      postExist.likedBy.pull(userId)
      postExist.likes -= 1
    }

    postExist.dislikedBy.push(userId)
    postExist.dislikes += 1

    const saveDisLike = await postExist.save()
    res.status(200).json(saveDisLike)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

export default CommentRouter
