const express = require('express')
const app = express()
const PORT = process.env.PORT || 9000
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', async (client) => {
    let roomName;
    client.on('join', (room) => {
        client.join(room.code)
        roomName = room.code
        io.of('/').in(room.code).clients(function (error, clients) {
            var numClients = clients.length;
            if (numClients > 2) {
                client.emit('disconnectUser', { error: "Room Full" })
            } else {
                if (numClients === 1) {
                    client.emit('currentStatus', { msg: "Waiting for player to join" })

                } else {
                    client.broadcast.to(room.code).emit('opponentJoined')
                    client.emit('opponentJoined')
                    client.emit('currentStatus', { msg: "Waiting for player to choose" })
                    client.broadcast.to(room.code).emit('currentStatus', { msg: "Waiting for player to choose" })

                }
            }
        }, client);
    })


    client.on('playerMoved', (msg) => {
        io.of('/').in(roomName).clients(function (error, clients) {
            var numClients = clients.length;
            if (numClients === 2) {
                client.broadcast.to(roomName).emit('opponentMoved', { msg: msg.move })
            }
        })
    })


    client.on('disconnect', () => {
        client.broadcast.to(roomName).emit('opponentLeft')
    })




})



server.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})