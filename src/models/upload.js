const mongoose=require('mongoose')
const uploadSchema=mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    event:{
        type:Buffer,
        required:true
    }
})

const Upload=mongoose.model('Upload',uploadSchema)
module.exports=Upload