import expres from 'express'
import Video from '../model/video.js'
import Comment from '../model/comment.js'
import AlbumVideo from '../model/albumVideo.js'
import User from '../model/user.js'
import Update from '../model/update.js'
import Movie from '../model/movie.js'
import Order from '../model/order.js'
import Chat from '../model/chat.js'
import PlayList from '../model/playList.js'
const seedRoutes = expres.Router()

seedRoutes.get('/', async (req, res) => {
  const CreateVid = await Video.insertMany()
  const CreateMovie = await Movie.insertMany()
  const CreateOrder = await Order.insertMany()
  const CreateChat = await Chat.insertMany()
  const CreatePlayList = await PlayList.insertMany()
  const CreateAlb = await AlbumVideo.insertMany()
  const CreateComment = await Comment.insertMany()
  const CreateUpdate = await Update.insertMany()
  const CreateUser = await User.insertMany()
  res.send({ CreateVid, CreateComment,CreateChat, CreatePlayList,CreateUser, CreateUpdate ,CreateAlb,CreateMovie,CreateOrder})
})

export default seedRoutes
