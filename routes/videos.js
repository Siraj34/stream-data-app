import express, { Router } from 'express'
import Video from '../model/video.js'

import User from '../model/user.js'
import { generateToken, isAdmin, isAuth } from '../generetison.js'
import Album from '../model/albumVideo.js'
const VideoRouter = express.Router()

//CREATE

VideoRouter.get('/create', isAuth, (req, res) => {
  console.log('hollew')
})

VideoRouter.post('/post', isAuth, async (req, res) => {
  const newVideo = new Video({
    videoUrl: req.body.videoUrl,
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    slug:req.body.slug,
    album: req.body.album,
    title: req.body.title,
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
VideoRouter.get('/get', async (req, res) => {
  try {
    const video = await Video.find()
    res.status(200).send(video)
  } catch (error) {
    res.status(500).send(error)
  }
})

VideoRouter.get('/room/:id', async (req, res) => {
  const video = await Video.findOne({ _id: req.params.id })
  if (video) {
    res.send(video)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})

VideoRouter.get('/get/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (err) {
    console.log(err)
  }
})

VideoRouter.put('/views/:id',isAuth,async(req,res)=>{
 
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      console.log(err);
    }
  
  
})
VideoRouter.put('/get/:id', async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })
    res.status(200).json('The view has been increased.')
  } catch (err) {
    console.log(err)
  }
})



VideoRouter.get('/slug',async (req, res) => {
  
  const categories = await Video.find().distinct('slug')
  
  res.send(categories)
})



VideoRouter.get('/search', async (req, res) => {
  const query = req.query.q
  try {
    const videos = await Video.find(
       {slug:{ $regex: `${query}`, $options: 'i' }}
  ).limit(40)
    res.status(200).json(videos)
  } catch (err) {
    console.log(err)
  }
})

VideoRouter.get('/tags', async (req, res) => {
  const tags = req.query.tags.split(',')
  try {
    const videos = await Video.find({ name: { $in: tags } }).limit(20)
    res.status(200).json(videos)
  } catch (err) {
    console.log(err)
  }
})



VideoRouter.put('/update/:id', isAuth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return console.log(404, 'Video not found!')
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
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
    next(err)
  }
})

VideoRouter.delete('/delete/:id', isAuth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return console.log(404, 'Video not found!')
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id)
      res.status(200).json('The video has been deleted.')
    } else {
      return console.log(403, 'You can delete only your video!')
    }
  } catch (err) {
    console.log(err)
  }
})






VideoRouter.delete('/deletePost/:postId', isAuth, (req, res) => {
  Video.findOne({ _id: req.params.postId })
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


VideoRouter.put("/like", isAuth, (req, res) => {
  Video.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )?.then((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});



VideoRouter.put("/unlike", isAuth, (req, res) => {
  Video.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )?.then((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});





export default VideoRouter
