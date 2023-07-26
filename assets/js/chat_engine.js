class Chatengine{
    constructor(chatid,useremail){
        this.chatid = $(`#${chatid}`);
        this.useremail = useremail;

        this.socket = io.connect('http://localhost:5000');

        if(this.useremail){
            this.connectionhandler();
        }
        
    }

    connectionhandler(){
        let self = this;

        this.socket.on('connect',function(){
            console.log("server connection is established - chatengine");

            self.socket.emit('join_room',{
                useremail : self.useremail,
                chatroom : 'codial'
            })

            self.socket.on('user_joined',function(data){
                console.log("A user joined",data);
            })

            $('#chat-click').click(function(e){
                e.preventDefault();
                let message = $('#input-box').val();
                self.socket.emit('send_message',{
                    message : message,
                    useremail : self.useremail,
                    chatroom : 'codial' 
                })
            })

            self.socket.on("sending_response",function(data){
                let newmessage = $('<li>',{
                    'html' : data.message
                });
                newmessage.append($('<sub>',{
                    'html' : data.useremail
                }));

                let messagetype = 'others-message';
                if(data.useremail == self.useremail){
                    messagetype = 'self-message';
                }

                newmessage.addClass(messagetype);
                $('#chat-area').append(newmessage);
            })
        })

    }
}