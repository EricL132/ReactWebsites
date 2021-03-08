const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const server = require('http').createServer();
const io = require('socket.io')(server);
const {userJoin,getRoomUsers,removeUser} = require('./utils/users')


io.on('connection',(client)=>{
    console.log('connected')
    client.on('join',({name,room})=>{
        const user = userJoin(client.id,name,room)
        client.join(user.room)


        client.broadcast.to(user.room).emit('message',{message:`${user.name} has joined the room`,type:"sender"})
        client.on('chatMessage',(msg)=>{
            client.broadcast.to(user.room).emit('message',{message:msg.message,type:"reciever",user:user.name,time:new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})})
    
        })

        client.on('getUsers',(room)=>{
            const roomusers = getRoomUsers(room)
            client.emit('roomUsers',roomusers)
        })

        client.on('disconnect',()=>{
            const user =  removeUser(client.id)
            if(user){
            client.to(user.room).emit('message',{message:`${user.name} has left the room`,type:"sender"})
            }
        })
        
    })
})

io.listen(PORT)

app.use(express.json())
app.listen(()=>{
    console.log("Connected to port: "+PORT)
})  