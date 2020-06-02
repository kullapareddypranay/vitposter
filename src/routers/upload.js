const express=require('express')
const auth=require('../middleware/auth')
const Upload=require('../models/upload')
const multer=require('multer')
const sharp=require('sharp')
const router=express.Router()



const upload=multer({
    limits:{
       fileSize:1000000
    },
    fileFilter(req,file,cb){
       if(! file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)){
           return cb(new Error('upload image'))
       }
       cb(undefined,true)
    }
})

router.post('/users/uploadEvent',auth,upload.single('event'),async (req,res)=>{
   // const description=req.body.description;
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    const event=buffer
    const owner=req.user._id;
    const upload=new Upload({owner,event})
    try{
        await upload.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send(e)
    }
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


module.exports=router;