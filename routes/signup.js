import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../model/user.js'
import Video from '../model/video.js'
import Comment from '../model/comment.js'
import expressAsyncHandler from 'express-async-handler'

import { generateToken, isAuth } from '../generetison.js'
import Movies from '../model/movie.js'
import Album from '../model/albumVideo.js'
import Order from '../model/order.js'
const userRouter = express.Router()

userRouter.get('/get', (req, res) => {
  res.send('hellow')
})

userRouter.post(
  '/signin',

  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          imageUrl: user.imageUrl,
          admin: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Invalid email or password' })
  })
)

userRouter.post(
  '/signup',

  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      imageUrl:req.body.imageUrl,
      subscribers:req.body.subscribers,
      password: bcrypt.hashSync(req.body.password),
    })
    const user = await newUser.save()
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl,
      subscribers:user.subscribers,
      admin: generateToken(user)
    })
  })
)

userRouter.get('/user/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Movies.find({ postBy:req.params.id })
        .populate('postBy', '_id')
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ message: err })
          }
          res.status(200).json({ user, post })
        })
    })
  
    .catch((err) => {
      return res.status(404).json({ error: err })
    })
})


userRouter.get('/movies/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Movies.find({ postBy:req.params.id })
        .populate('postBy', '_id')
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ message: err })
          }
          res.status(200).json({ user, post })
        })
    })
  
    .catch((err) => {
      return res.status(404).json({ error: err })
    })
})

userRouter.get('/album/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Album.find({ postBy:req.params.id })
        .populate('postBy', '_id')
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ message: err })
          }
          res.status(200).json({ user, post })
        })
    })
  
    .catch((err) => {
      return res.status(404).json({ error: err })
    })
})






userRouter.delete('/deleteUser/:id', isAuth, async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByI(req.params.id)
      res.status(200).json('User has been deleted.')
    } catch (err) {
      console.log(err)
    }
  } else {
    return console.log(403, 'You can delete only your account!')
  }
})


userRouter.put('/sub/:id',isAuth,async (req,res)=>
{
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successfull.")
    } catch (err) {
      console.log(err);
    }
  
})









userRouter.get('/comment/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Comment.find({ postBy: req.params.id })
        .populate('postBy', '_id')
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ message: err })
          }
          res.status(200).json({ user, post })
        })
    })
  
    .catch((err) => {
      return res.status(404).json({ error: err })
    })
})



userRouter.put('/follow', isAuth, async (req, res) => {
  const job = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },

    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .select('-password')
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        return res.status(422).json({ error: err })
      })
  )
})

userRouter.put('/unfollow', isAuth, async (req, res) => {
  const job = await User.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },

    User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .select('-password')
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        return res.status(422).json({ error: err })
      })
  )
})


userRouter.get('/order/:id', (req, res) => {
  
      Order.find({postBy:{$in: req.user} })
        .populate('postBy', '_id')
        .then((post, err) => {
          if (err) {
            return res.status(422).json({ message: err })
          }
          res.status(200).json({  post })
        })
   
  
    .catch((err) => {
      return res.status(404).json({ error: err })
    })
})




export default userRouter
