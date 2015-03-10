//#BACKEND

//###REQUIRED LIBRARIES
var port = process.env.PORT || 3000;

//###REQUIRE EXPRESS
var express = require('express');

//###REQUIRE EXPRESS ADD ON'S
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//###INITIALISE EXPRESS APP
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//###SETUP EXPRESS ADD ON'S
app.use(cookieParser())

//Setup both body parser for JSON, and basic form encoding
.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        secret: 'lou',
        resave: true,
        saveUninitialized: true
    }));

//##COOKIE SETUP
require('./middleware/cookies.js')(app);

//##HEADER SETUP
require('./middleware/headers.js')(app);

//##ASSIGN GET REQUESTS TO THE REQ OBJECT
require('./middleware/get_params.setup.js')(app);

//##SETUP OF PARAMETERS SUCH AS GET, POST ETC
require('./middleware/params.js')(app);

//##RESTRICT ANON ACCESS TO ALL APIS
require('./middleware/api.authentication.js')(app);

//##ROUTES
require('./middleware/backend.routes.js')(app, io);

//##PORT SETUP
server.listen(port);

console.log("-------- Server running at http://127.0.0.1:" + port + "/ --------");
console.log("-------- Database: " + process.env.DATABASE + "  --------");