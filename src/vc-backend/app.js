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
      socket.nickname = data.username;
      socket.emit('login', { 'success': true, 'uid': socket.id });
    });

    // TODO: 用户只能加入一个房间
    socket.on('join', function(data) {
      if (data.uid == undefined || data.uid == socket.id) {
        socket.join(data.room, () => {
          let rooms = Object.keys(socket.rooms);
          console.log(rooms); // [ <socket.id>, 'room 237' ]
        });
        console.log(socket.id + ' join room ' + data.room);
      } else {
        socket.to(`${data.uid}`).emit('join');
        io.sockets.connected[data.uid].join(data.room);
        console.log(data.uid + ' join room ' + data.room);
      }
    });

    socket.on('leave', function(data) {
      if (data.uid == undefined || data.uid == socket.id) {
        socket.leave(data.room);
        console.log(socket.id + ' leave room ' + data.room);
      } else {
        socket.to(`${data.uid}`).emit('leave');
        io.sockets.connected[data.uid].leave(data.room);
        console.log(data.uid + ' join room ' + data.room);
      }
    });

    socket.on('mute', function(data) {
      io.to(`${data.uid}`).emit('mute');
    });

    socket.on('unmute', function(data) {
      io.to(`${data.uid}`).emit('unmute');
    });

    socket.on('message', function(data) {
      console.log(data.msg);
      let rooms = Object.keys(socket.rooms);
      console.log(rooms[0]);
      var roster = io.of('/').in(rooms[0]).clients;
      console.log(roster);
      socket.to(rooms[0]).emit('message', { 'msg': data.msg });
    });

    socket.on('file', function(data){
      console.log(data.url);
      let rooms = Object.keys(socket.rooms);
      io.in(rooms[0]).emit('file', { 'url' : data.url });
    })
  });
