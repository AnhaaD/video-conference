const io = require('socket.io-client');

var _socket;
var _listener;
var _uid;

const BCloud = require('@byted-light/bcloud');

// 创建轻服务实例
const _bc = new BCloud({
  serviceId: 'tt29489l68z57zli99'
});

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

        _socket.on('join', function(data){
            _listener.join(data.room);
        })

        _socket.on('leave', function(data){
            _listener.leave();
        })

        _socket.on('unmute', function(data){
            _listener.unmute();
        })

        _socket.on('message', function(data){
            console.log('-----------' + data.msg);
            _listener.onMessage(data.msg);
        })

        _socket.on('file', function(data){
            console.log('-----------' + data.url);
            _listener.onFile(data.url);
        })
    },
    
    'bindListener': function(listener) {
        _listener = listener;
    },
    
    'joinRoom': function joinRoom(room) {
        _socket.emit('join', { 'uid': _uid, 'room': room });
    },
    
    'leaveRoom': function leaveRoom(room) {
        _socket.emit('leave', { 'uid': _uid, 'room': room });
    },

    'muteUser': function muteUser(uid) {
        _socket.emit('mute', { 'uid': uid });
    },

    'unmuteUser': function unmuteUser(uid) {
        _socket.emit('unmute', { 'uid' : uid });
    },

    'sendMessage': function sendMessage(message) {
        _socket.emit('message', { 'msg': message });
    },

    'uploadFile': function uploadFile(filePath) {
        _bc.file.upload(filePath, filePath)
        .then((data) => {
            // 上传成功
            console.log(data.url);
            _socket.emit('file', { 'url' : data.url });
        })
        .catch((error) => {
            // 调用失败，进行错误处理
        });
    }
}

// console.log('--------------');

// // 调用轻服务函数
// bc.run(fnName)
//   .then(data => {
//     // 处理结果
//   })
//   .catch(error => {
//     // 处理异常
//   });

// const path = require('path');

// const file = { path: path.join(__dirname, 'file.txt') };
