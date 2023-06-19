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
const passportJwt = require('./confiq/passport_jwt_strategy');
const passportGoogle = require('./confiq/passport_google_oauth2_strategy');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const middleware = require('./confiq/middleware');



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

//creating route for uploads
app.use('/uploads',express.static(__dirname + '/uploads'));

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

//flash need to be put after the session because it uses it.
app.use(flash());
app.use(middleware.flashmessage);

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