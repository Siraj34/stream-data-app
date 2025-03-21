import express, { Router } from 'express'

import {v2 as cloudinary} from 'cloudinary'




const signUploadRouter = express.Router()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    secure:true
})

signUploadRouter.post('/post',(req,res)=>{
    const {folder} = req.body;
    if (!folder) {
        res.status(400)
        return console.log('folder name is required')
    }

    try {
        const timestamp = Math.round((new Date).getTime()/100)
        const signature = cloudinary.utils.api_sign_request({
            timestamp,
            folder
        },process.env.CLOUDINARY_API_SECRET)
        res.status(200).json({timestamp,signature})
    } catch (error) {
        console.log(error)
        res.status(500)

    }
})


export default  signUploadRouter