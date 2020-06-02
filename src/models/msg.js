const mongoose=require('mongoose')
const msgSchema=mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    msg:{
        type:String
    }
})

const Msg=mongoose.model('Msg',msgSchema)
module.exports=Msg