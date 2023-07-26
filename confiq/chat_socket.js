module.exports.chatsockets = function(chatserver){
    let io = require('socket.io')(chatserver,{
        cors : {
            origin : ["http://localhost:8000"],
        },
    });

    io.sockets.on('connection',function(socket){
        console.log("New connection received",socket.id);

        socket.on('disconnect',function(){
            console.log("socket disconnected");
        });

        socket.on('join_room',function(data){
            console.log("request received..");
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        })

        socket.on('message',function(data){
            console.log(data.message);
        })

        socket.on('send_message',function(data){
            console.log("sending message to all users");
            io.in(data.chatroom).emit('sending_response',data);
        })
    });

    

}