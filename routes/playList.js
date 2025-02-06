import expres from 'express'

import { generateToken, isAuth } from '../generetison.js'
import PlayList from '../model/playList.js'




const playListRouter = expres.Router()
playListRouter.post(
  '/post',
 async (req, res) => {
    const newPlayList = new PlayList({
      imageUrl: req.body.imageUrl,
      videoUrl:req.body.videoUrl,
      name: req.body.name,
      title: req.body.title,
      user: req.body.user,
      userName: req.body.userName,
      image:req.body.image,
      movieId:req.body.movieId,
      postBy:req.body.postBy,
      chatId:req.body.chatId,
      musicName:req.body.musicName,
      
    })
    const playList = await newPlayList.save()
    res.status(201).send({ message: 'NEW playList Created', playList })
  }
)

playListRouter.get('/get', async (req, res) => {
  try {
    const play = await PlayList.find()
    res.status(200).send(play)
  } catch (error) {
    res.status(500).send(error)
  }
})


playListRouter.get('/play/:id', async (req, res) => {
  const play = await PlayList.find({chatId: req.params.id})
  if (play) {
    res.send(play)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})

playListRouter.get('/add/:id', async (req, res) => {
  const play = await PlayList.findOne({_id: req.params.id})
  if (play) {
    res.send(play)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})


playListRouter.get("/list",isAuth, (req, res) => {

  PlayList.find( {postBy:{ $in: req.user } })
      .populate("postBy", "_id name")
      
      .then(posts => {
          res.json(posts)
      })
      .catch(err => { console.log(err) })
})



export default playListRouter