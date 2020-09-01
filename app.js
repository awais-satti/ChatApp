const express = require('express');
const path = require('path');
const http =require('http');
const dotenv = require('dotenv');
const db = require('./config/db')
const socketio = require('socket.io');
const formatMessages = require('./utils/messages');
const {userJoin,getCurrentUser,leaveUser,getRoomUsers} = require('./utils/users')

//load config
dotenv.config({path:'./config/config.env'})
db();
const botname = 'ChatBot'

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// set static folder
app.use(express.static(path.join(__dirname , 'public')))

// Run when client connects 
io.on('connection',socket=>{
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room)

    socket.join(user.room)
         //welcome current user
    socket.emit('message',formatMessages(botname,'welcome to chatbox'))

    //Broadcast when user connects 
   socket.broadcast.to(user.room).emit('message', formatMessages(botname,` ${user.username} has joined the Room`))

     // send user room info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })


    })
     

     //Listen for chat message
     socket.on('chatMessage',msg=>{
         const user = getCurrentUser(socket.id);
        

         io.to(user.room).emit('message',formatMessages(`${user.username}`,msg));
     })

      //Runs when client disconnect 
      socket.on('disconnect',()=>{
        const user = leaveUser(socket.id);
        if(user){
        io.to(user.room).emit('message',formatMessages(botname,`${user.username} left the chat`))
        }
        
    })


})



const PORT = process.env.PORT || 5000;



server.listen(PORT,console.log(`app is running on port ${PORT}`))









