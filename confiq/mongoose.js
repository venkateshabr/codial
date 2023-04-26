const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/codial');



const db = mongoose.connection;



db.on('error',console.error.bind('console',"There is an error in connecting"));

db.once('open',function(){
    console.log("Mongoose has been started");
})