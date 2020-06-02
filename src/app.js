const express=require('express')
require('./database/mongoose')
const userrouter=require('./routers/user')
const uploadrouter=require('./routers/upload')
const app=express()
const socketio=require('socket.io')
const http=require('http')
const hbs=require('hbs')
const path=require('path')
//create http server using express app
const server=http.createServer(app)
//connect socket.io to http server,ca
const io=socketio(server)


const publicDirectoryPath=path.join(__dirname,'../public')
//using static public folder
app.use(express.static(publicDirectoryPath))

//setting viewing for hbs
const viewPaths=path.join(__dirname,'../templates/views')
//setting path for partials that can be reused
const partialPath=path.join(__dirname,'../templates/partials')

//setting up handler bar for dyanamic pages
app.set('view engine','hbs')
app.set('views',viewPaths)
hbs.registerPartials(partialPath)


const port=3000||process.env.PORT 
app.use(express.json())
app.use(userrouter)
app.use(uploadrouter)
//app.use()

require('./routers/eventDashboard')(app,io)
require('./routers/chat')(app,io)

app.get('/',(req,res)=>{
    res.send("hello")
})



server.listen(port,()=>{
    console.log(`server is up on ${port}`)
})