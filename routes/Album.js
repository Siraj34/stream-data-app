import express, { Router } from 'express'

import { generateToken, isAdmin, isAuth } from '../generetison.js'
import Album from '../model/albumVideo.js'
const AlbumRouter = express.Router()

//CREATE


AlbumRouter.post('/album', isAuth, async (req, res) => {
  const newAlbum = new Album({
    
   
    imageUrl: req.body.imageUrl,
    name: req.body.name,
    album: req.body.album,
    title: req.body.title,
    views: req.body.views,
    star: req.body.star,
    user: req.body.user,
    userEmail:req.body.userEmail,
    userName: req.body.userName,
    postBy: req.user,
   
  })
  const getAlbum = await newAlbum.save()
  res.status(201).send({ message: 'NEW Order Created', getAlbum })
})
//DELETE

AlbumRouter.get('/get', async (req, res) => {
  try {
    const album = await Album.find()
    res.status(200).send(album)
  } catch (error) {
    res.status(500).send(error)
  }
})

AlbumRouter.get('/room/:id', async (req, res) => {
  const album = await Album.findOne({ _id: req.params.id })
  if (album) {
    res.send(album)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})


AlbumRouter.delete('/delete/:id', isAuth, async (req, res) => {
  try {
    const video = await Album.findById(req.params.id)
    if (!video) return console.log(404, 'Video not found!')
    if (req.user.id === video.userId) {
      await Album.findByIdAndDelete(req.params.id)
      res.status(200).json('The video has been deleted.')
    } else {
      return console.log(403, 'You can delete only your video!')
    }
  } catch (err) {
    console.log(err)
  }
})

export default AlbumRouter
