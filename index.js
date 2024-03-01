const express = require('express');
const app = express();
const port = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});


socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    
    socket.on('activation-request', (data) => {
        socketIO.emit('activation-request', data);
    });

    socket.on('activation-accept', (data) => {
        socketIO.emit('activation-accepted', data);
    });
    
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});


http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

