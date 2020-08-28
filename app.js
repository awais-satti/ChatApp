const express = require('express');
const path = require('path');
const http =require('http');
const dotenv = require('dotenv');
const db = require('./config/db')
const socketio = require('socket.io');

//load config
dotenv.config({path:'./config/config.env'})
db();

const app = express();
const server = http.createServer(app);
const io = socketio(server);


// set static folder
app.use(express.static(path.join(__dirname , 'public')))

// Run when client connects 
io.on('connection',socket=>{
    console.log('new webSocket connection....')
})



const PORT = process.env.PORT || 5000;















server.listen(PORT,console.log(`app is running on port ${PORT}`))









