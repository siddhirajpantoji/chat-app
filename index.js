const express = require('express');
const moment = require('moment-timezone')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat-message-recieve', ( user, msg) => {
        console.log("Chat Message recieve Event ")
        var timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
        socket.broadcast.emit('chat-message-send', msg, user,timestamp);
        socket.emit('chat-message-send', msg, "Me",timestamp);
        console.log("Sending message to client ")
        console.log('message: ' + msg);
    });
});

server.listen(3000, () => {
    console.log('Listening on *: 3000');
});
