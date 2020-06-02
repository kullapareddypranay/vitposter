const express=require('express')
const auth=require('../middleware/auth')
const Upload=require('../models/upload')
module.exports=(app,io)=>{
    app.get('/i',auth,async(req,res)=>{
        try{
            const event=await Upload.find()
            if(!event){
                return res.status(404).send()
            }
            res.send(event)
        }catch(e){
            res.status(500).send()
        }
    })
}