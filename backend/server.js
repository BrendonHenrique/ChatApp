const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const requireDir = require('require-dir')
mongoose.connect('mongodb://localhost:27017/chat',
    { useUnifiedTopology: true, useNewUrlParser: true },
);
requireDir("./src/models");
const Messages = mongoose.model('Messages')

const getMessagesFromDB = async () => await Messages.find();
const saveSendedMessage = async (message) => await Messages.create(message);

io.on('connection', socket => { 

    socket.emit('newUser', socket.id);

    getMessagesFromDB().then(messages => {
        socket.emit('getMessages',messages);
    });
    
    socket.on('sendMessage', message => {
        saveSendedMessage(message).then(newSavedMessage => { 
            socket.broadcast.emit('receivedMessage', newSavedMessage);
            socket.emit('receivedMessage', newSavedMessage); 
        });
    });
});

server.listen(3001, () => { 
    console.log('Servidor escutando na porta 3001')
});