const io = require('socket.io-client');

var _socket;
var _listener;
var _uid;

exports.apis = {
    'login': function login(username, success, fail) {
        _socket = io('http://localhost:8989');
        _socket.emit('login', { 'username': username });
        _socket.on('login', function(data){
            if (data.success) {
                _uid = data.uid;
                success();
            } else {
                fail();
            }
        });
    },
    
    'bindListener': function(listener) {
        _listener = listener;
    },
    
    'joinRoom': function joinRoom(room) {
        _socket.emit('join', { 'room': room });
        _socket.on('join', function(data){
            _listener.join(data.room);
        })
    },
    
    'leaveRoom': function leaveRoom(room) {
        _socket.emit('leave', { 'room': room });
        _socket.on('leave', function(data){
            _listener.leave();
        })
    },

    'muteUser': function muteUser(uid) {
        _socket.emit('mute', { 'uid': uid });
        _socket.on('mute', function(data){
            _listener.mute();
        console.log('---------mute------');

        })
    },

    'unmuteUser': function unmuteUser(uid) {
        _socket.emit('unmute', { 'uid' : uid });
        _socket.on('unmute', function(data){
            _listener.unmute();
        })
    },

    'test': function test(){
        apis.muteUser(_uid);
        console.log('-------------------');
        apis.unmuteUser(_uid);
    }
}