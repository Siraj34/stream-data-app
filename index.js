import express from 'express'

import mongoose from 'mongoose'
import dotenv from 'dotenv'

import cors from 'cors'
import seedRoutes from './routes/seeds.js'
import AlbumRouter from './routes/Album.js'
import VideoRouter from './routes/videos.js'
import MovieRouter from './routes/movie.js'
import CommentRouter from './routes/comment.js'
import UpdateRouter from './routes/update.js'
import userRouter from './routes/signup.js'
import orderRouter from './routes/order.js'

const app = express()
dotenv.config()
app.use(cors())
app.options('*', cors())
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}
app.use(allowCrossDomain)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected mongodb')
  })
  .catch((err) => {
    console.log(err.message)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/api/seed', seedRoutes)
app.use('/api/albums', AlbumRouter)
app.use('/api/videos', VideoRouter)
app.use('/api/movies', MovieRouter)
app.use('/api/comments', CommentRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', UpdateRouter)
app.use('/api/user/', userRouter)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server att http://localhost:${port}`)
})
