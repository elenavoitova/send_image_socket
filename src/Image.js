var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendfile('src/html/Image.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

// Register "connection" events to the WebSocket
io.on("connection", function(socket) {
    // Register "join" events, requested by a connected client
    socket.on("join", function (room) {
        console.log('Client connected!');
        // join channel provided by client
        socket.join(room);
        // Register "image" events, sent by the client
        socket.on("image", function(msg) {
            // Broadcast the "image" event to all other clients in the room
            socket.broadcast.to(room).emit("image", msg);
        });
    })
});
