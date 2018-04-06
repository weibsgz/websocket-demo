var app = require('http').createServer()
var io = require('socket.io')(app);

var clientCont = 0;
app.listen(3000);


io.on('connection', function (socket) {
    clientCont++;
    socket.nickname = "user" + clientCont;
    //如果调用socket.emit 就是对客户端发送消息   如果调用io.emit 就是进行广播
    //io是服务端的socket，connection事件里面给的socket是连接上了的客户端socket，io和socket是一对多的关系
    io.emit('enter',socket.nickname + 'comes in')

    //接受消息的时候
    socket.on('message',function(str){
        io.emit('message',socket.nickname + ':' +　str)
    })

    socket.on('disconnect',function(){
        io.emit('leave',socket.nickname + 'left')
    })

});
      