import expres from 'express'
import Order from '../model/order.js'
import { generateToken, isAuth } from '../generetison.js'




const orderRouter = expres.Router()
orderRouter.post(
  '/post',isAuth,
 async (req, res) => {
    const newOrder = new Order({
      imageUrl: req.body.imageUrl,
      videoUrl:req.body.videoUrl,
      name: req.body.name,
      title: req.body.title,
      user: req.body.user,
      userName: req.body.userName,
      image:req.body.image,
      movieId:req.body.movieId,
      postBy:req.body.postBy,
       postBy:req.user
    })
    const order = await newOrder.save()
    res.status(201).send({ message: 'NEW Order Created', order })
  }
)

orderRouter.get('/get', async (req, res) => {
  try {
    const order = await Order.find()
    res.status(200).send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})


orderRouter.get('/room/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id })
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})


orderRouter.get("/history",isAuth, (req, res) => {

  Order.find( {postBy:{ $in: req.user } })
      .populate("postBy", "_id name")
      
      .then(posts => {
          res.json(posts)
      })
      .catch(err => { console.log(err) })
})



export default orderRouter