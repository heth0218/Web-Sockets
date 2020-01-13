var express=require("express");
var socket=require("socket.io");

var app=express();
var server=app.listen(4000,function(){
    console.log("listening to request");
});

app.use(express.static("public"));  

var io=socket(server);

io.on("connection",function(socket){
    console.log("made socket connection",socket.id);

    socket.on("chat",function(data){
        socket.to(data.to).emit('chat', data);
        io.to(socket.id).emit('chat', data);
    });
    socket.on('typing', function(data){
        socket.to(data.to).emit('typing', data);
    });
});