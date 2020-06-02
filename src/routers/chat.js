const users=[]
const auth=require('../middleware/auth')
const User=require('../models/user')
const Msg=require('../models/msg')
const RoomUser=require('../models/room')
const { generateMessage }=require('../utils/message')
const {addUser,removeUser,getUser,getUserRoom}=require('../utils/user')
module.exports=(app,io)=>{
    
    app.get('/chat',auth,(req,res)=>{
        res.render('chat',{
            user:req.user._id
        })
    })

    // app.get('/exploreFriends',async(req,res)=>{
    //     try{
    //         const user=await User.find()
    //         if(!user){
    //             return res.status(404).send()
    //         }
    //         users.push(user)
    //         res.send(user)
    //     }catch(e){
    //         res.status(500).send()
    //     }
    // })
    io.on('connection',(socket)=>{
        var room
        var _id
        console.log('startedconnection')


        socket.emit('message',generateMessage('welcome'))


        //userid is sent from client side  as msg in the following connection on users
        socket.on('users',(msg)=>{
            _id=msg.username
           room=msg.room
        //    console.log(room)
        //    console.log(_id)
        })


        socket.on('sendmessage',(msg,callback)=>{
            // const message=new Msg({owner:_id,msg})
            // message.save()
            io.to(room).emit('message',generateMessage(msg))
            callback()
        })


        //database storage for saving messages 
        // const message=new Msg({owner:_id,msg})
        // message.save()

    


        //room creation
        // socket.on('join',({username,room},callback)=>{
        //     const {error,user}=addUser({id:socket.id,username,room})
        //     if(error){
        //         return callback(error)
        //     }
        //     socket.join(user.room)
        //     socket.emit('message',generateMessage('welcome'))
        //     socket.broadcast.to(room).emit('message',generateMessage(`${user.username} has joined `))

        //     callback()
        // })
        


        // data base for storing socketid so he can be tracked 
        socket.on('join',({username,room},callback)=>{
            const user=User.findById(_id)
            const socketid=socket.id
            user.sockets=user.sockets.concat({socketid})
            user.save()
            socket.join(room)
            socket.emit('message',generateMessage('welcome'))
            socket.broadcast.to(room).emit('message',generateMessage(`${username} has joined`))
        })















        socket.on('disconnect',()=>{
            const socketid=socket.id
            const user=User.findById(_id)
            user.sockets=user.sockets.filter((socket)=>{
                return socket.socketid!==socketid
            })
        })









        // socket.on('disconnect',()=>{
        //     const user=removeUser(socket.id)
        //     if(user){
        //         io.to(user.room).emit('message',generateMessage(`${user.username} has left`))
        //     }
          
        // })

        // socket.on('sendrequest',(data)=>{
        //     socket.join('friends')
        //     var data={
        //         "userId":data.username
        //     }

        // })





    })

}