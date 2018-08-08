'use strict';

const express = require("express"),
    cors = require('cors'),
    path = require('path'), // works with file system path
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongojs = require('mongojs'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    config = require('./config'),
    app = express();


var originsWhitelist = [
    'http://localhost:4200', //this is my front-end url for development
    'https://quizgiri-clientapp.herokuapp.com/'
];
var corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

const port = process.env.PORT || 5000;

//View Engine

// path to the views : 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder to store the angular app
//app.use(express.static(path.join(__dirname, 'quizgiri-clientapp')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    useMongoClient: true 
};

function _initializeModels() {
    mongoose.connect(config.db, options, (err) => {
        if(err){
            console.log('Mongo connection error', {
                err: err
            });
            process.exit(0);
        }
        else{
            console.log('Successfully connected to: ' + config.db);
        }
    })
    // mongoose.connection.on('error', function (err) {
    //     console.log('Mongo connection error', {
    //         err: err
    //     });
    // });

    // mongoose.connect(config.db, { useMongoClient: true }, function (err, res) {
    //     if (err) { 
    //         console.log('Error when connecting to: ' + config.db + '. ' + err);
    //     } 
    //     else {
    //         console.log('Successfully connected to: ' + config.db);
    //     }
    // });
    
}

_initializeModels();



app.use('/api', routes);

app.use('/', function(req, res, next){
    //res.send('INDEX PAGE');
    res.render('index.html');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views'));
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    //res.render('error');
});


// //Get All Tasks
// app.get('/tasks', function (req, res, next) {
//     console.log(db);
//     db.testcollection.find(function (err, tasks) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(tasks);
//     });
// });

// //Get All Tasks
// app.get('/getAdmins', function (req, res, next) {
//     console.log(db);
//     db.admin.find(function (err, admins) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(admins);
//     });
// });

// process.on('SIGINT', function () {
//     mongoose.connection.close(function () {
//         console.log('Mongoose disconnected on app termination');
//         process.exit(0);
//     });
// }); 

app.listen(port, () => {
    console.log(`listening on port ${port} ...... `);
});