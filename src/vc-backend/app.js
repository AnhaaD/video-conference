var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8989, function(){
  console.log('listening on *:8989');
});

const root = io
  .of('/')
  .on('connection', function(socket) {
    console.log(socket.id + ' connected');
    socket.on('login', function(data) {
      console.log(data.username + ' login success ');
      socket.emit('login', { 'success': true, 'uid': socket.id });
    });
    socket.on('join', function(data) {
      if (data.uid == socket.id) {
        socket.join(data.room);
        console.log(socket.id + ' join room ' + data.room);
      } else {
        io.sockets.connected[data.uid].join(data.room);
        console.log(data.uid + ' join room ' + data.room);
      }
    });
    socket.on('leave', function(data) {
      if (data.uid == socket.id) {
        socket.leave(data.room);
        console.log(socket.id + ' leave room ' + data.room);
      } else {
        io.sockets.connected[data.uid].leave(data.room);
        console.log(data.uid + ' join room ' + data.room);
      }
    });
    socket.on('mute', function(data){
      sock = socket.to(`${data.uid}`);
      sock.emit('mute');
      socket.emit('mute');
    });
    socket.on('mute', function(data){
      socket.to(`${data.uid}`).emit('mute');
    });
    socket.on('unmute', function(data){
      socket.to(`${data.uid}`).emit('unmute');
    });
  });
