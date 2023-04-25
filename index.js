const express = require('express');
const port  = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log("Error in listening to the port");
    }
    console.log("Express Started");
})