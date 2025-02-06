import expres from 'express'


import Chat from '../model/chat.js'




const chatRouter = expres.Router()
chatRouter.post(
  '/post',
 async (req, res) => {
    const newChat = new Chat({
      videoUrl:req.body.videoUrl,
      imageUrl: req.body.imageUrl,
      title: req.body?.title, 
      musicName:req.body?.musicName,
      name: req.body.name,
      user: req.body.user,
      image: req.body.image,
      userName: req.body.userName,
      image:req.body.image,
      chatId:req.body.chatId,
      postBy:req.body.postBy,
      videoId:req.body.videoId,
      videoName:req.body.videoName
       
    })
    const chat = await newChat.save()
    res.status(201).send({ message: 'NEW Order Created', chat })
  }
)

chatRouter.get('/get', async (req, res) => {
  try {
    const order = await Chat.find()
    res.status(200).send(order)
  } catch (error) {
    res.status(500).send(error)
  }
})



chatRouter.get('/chat/:id', async (req, res) => {
  const chat = await Chat.findOne({_id: req.params.id})
  if (chat) {
    res.send(chat)
  } else {
    res.status(404).send({ message: 'Product not found' })
  }
})




export default chatRouter