const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const requireDir = require('require-dir')
requireDir("./src/models");

const Messages = []

// Conexão estabelecida, socket disponivel para comunicação
io.on('connection', socket => { 

    //GetMessages retorna para o cliente todas as mensagens enviadas até o momento
    socket.emit('getMessages', Messages);
    
    //SendMessages recebe mensagem do cliente, adiciona na lista de mensagens, compartilha a mensagem 
    // com os outros usuarios conectados, e retorna a mensagem para o usuario que a enviou
    socket.on('sendMessage', message => {

        Messages.push(message);
        socket.broadcast.emit('receivedMessage', message);
        socket.emit('receivedMessage', message); 
    });

    socket.on('disconnect', function(){ });
});

server.listen(3001, () => { 
    console.log('Servidor escutando na porta 3001')
});