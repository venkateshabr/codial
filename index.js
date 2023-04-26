const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port  = 8000;
const app = express();
const db = require('./confiq/mongoose');
const layout = require('express-ejs-layouts');

app.use(express.static('assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//We need to specify before the router about the layout
app.use(expressEjsLayouts);

//using express router
app.use('/',require('./routes'));


app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log("Error in listening to the port");
    }
    console.log("Express Started");
})