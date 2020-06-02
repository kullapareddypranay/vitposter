const mongoose=require('mongoose')
const roomuserSchema=mongoose.Schema({
    socketid:{
        type:String,
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    room:{
        type:String,
        required:true
    }
})

const RoomUser=mongoose.model('RoomUser',roomuserSchema)
module.exports=RoomUser