import Update from '../model/update.js'
import express from 'express'
const UpdateRouter = express.Router()

UpdateRouter.post('/update', async (req, res) => {
  const newComment = new Update({ ...req.body, usernameId: req.body.id })
  try {
    const savedComment = await newComment.save()
    res.status(200).send(savedComment)
  } catch (err) {
    console.log(err)
  }
})

UpdateRouter.get('/get/:videoId', async (req, res) => {
  try {
    const comments = await Update.find({ videoId: req.params.videoId })
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
})
export default UpdateRouter
