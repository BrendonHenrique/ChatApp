const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let messages = [];

io.on('connection', socket => { 
    
    console.log('novo socket'+ socket.id);
    socket.emit('newUser', socket.id);
    socket.emit('getMessages', messages);

    socket.on('sendMessage', data => { 
        console.log('received message' + JSON.stringify(data));
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
});

server.listen(3001, () => { 
    console.log('Servidor escutando na porta 3001')
});