import jwt from 'jsonwebtoken'
import User from './model/user.js'
const JWT_SECRET = 'funtnosihk'
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization) {
    const token = authorization.replace('Bearer ', '') // Bearer XXXXXX
    jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' })
  }
}
