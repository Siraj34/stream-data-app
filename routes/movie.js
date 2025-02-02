import express, { Router } from 'express'
import { generateToken, isAdmin, isAuth } from '../generetison.js'
import Movie from '../model/movie.js'
import User from '../model/user.js'


const MovieRouter = express.Router()

//CREATE

MovieRouter.get('/create', isAuth, (req, res) => {
  console.log('hollew')
})

MovieRouter.post('/post', isAuth, async (req, res) => {
  const newVideo = new Movie({
    videoUrl: req.body.videoUrl,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    album: req.body.album,
    title: req.body.title,
    slug:req.body.slug,
    image:req.body.image,
    views: req.body.views,
    star: req.body.star,
    user: req.body.user,
    userEmail:req.body.userEmail,
    userName: req.body.userName,
    postBy: req.user,
  })
  const getVideo = await newVideo.save()
  res.status(201).send({ message: 'NEW Order Created', getVideo })
})
//DELETE

//GET ALL PRODUCTS
MovieRouter.get('/get', async (req, res) => {
  try {
    const video = await Movie.find()
    res.status(200).send(video)
  } catch (error) {
    res.status(500).send(error)
  }
})

MovieRouter.get('/room/:id', async (req, res) => {
  const video = await Movie.findOne({ _id: req.params.id })
  if (video) {
    res.send(video)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})

MovieRouter.get('/get/:id', async (req, res) => {
  try {
    const video = await Movie.findById(req.params.id)
    res.status(200).json(video)
  } catch (err) {
    console.log(err)
  }
})

MovieRouter.put('/views/:id',isAuth,async(req,res)=>{
 
    try {
      await Movie.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      console.log(err);
    }
  
  
})
MovieRouter.put('/get/:id', async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.status(200).json('The view has been increased.')
  } catch (err) {
    console.log(err)
  }
})




MovieRouter.get('/search', async (req, res) => {
  const query = req.query.q
  try {
    const videos = await Movie.find(
       {slug:{ $regex: `${query}`, $options: 'i' }}
  ).limit(40)
    res.status(200).json(videos)
  } catch (err) {
    console.log(err)
  }
})


MovieRouter.get('/slug',async (req, res) => {
  
  const categories = await Movie.find().distinct('slug')
  
  res.send(categories)
})



MovieRouter.put('/update/:id', isAuth, async (req, res) => {
  try {
    const video = await Movie.findById(req.params.id)
    if (!video) return console.log(404, 'Video not found!')
    if (req.user.id === video.userId) {
      const updatedVideo = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedVideo)
    } else {
      return next(createError(403, 'You can update only your video!'))
    }
  } catch (err) {
    console.log(err)
  }
})

MovieRouter.delete('/delete/:id', isAuth, async (req, res) => {
  try {
    const video = await Movie.findById(req.params.id)
    if (!video) return console.log(404, 'Video not found!')
    if (req.user.id === video.userId) {
      await Movie.findByIdAndDelete(req.params.id)
      res.status(200).json('The video has been deleted.')
    } else {
      return console.log(403, 'You can delete only your video!')
    }
  } catch (err) {
    console.log(err)
  }
})






MovieRouter.delete('/deletePost/:postId', isAuth, (req, res) => {
  Movie.findOne({ _id: req.params.postId })
    .populate('postBy', '_id')
    .then((post, err) => {
      if (err || !post) {
        return res.status(422).json({ error: err })
      }

      if (post.postBy._id == req.user._id) {
        post
          .remove()
          .then((result) => {
            return res.json({ message: 'Successfully deleted' })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
})


MovieRouter.post('/like/:postId/:userId', async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.params.userId

    const postExist = await Movie.findByIdAndUpdate(postId)
    const userExist = await User.findByIdAndUpdate(userId)

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

MovieRouter.post('/dislike/:postId/:userId', async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.params.userId

    const postExist = await Movie.findById(postId)
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







export default MovieRouter
