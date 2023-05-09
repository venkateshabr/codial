const express = require('express');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const port  = 8000;
const app = express();
const db = require('./confiq/mongoose');
const layout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./confiq/passport_local_strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('assets'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//We need to specify before the router about the layout
app.use(expressEjsLayouts);


app.use(session({
    name:'codial',
    secret : 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1:27017/codial',
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'connect-mongo established');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

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