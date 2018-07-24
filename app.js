const express = require("express");
var  cors = require('cors');
var path = require('path');  // works with file system path
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

const app = express();
//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
     'https://quizgiri-clientapp.herokuapp.com/'
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));


const port = process.env.PORT || 5000;


//app.use(cors());

var index = require('./routes/index');

var db = mongojs("mongodb://anurag:anurag09@ds145921.mlab.com:45921/quizgiri", ['testcollection']);
 
//View Engine

// path to the views : 
app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder to store the angular app
//app.use(express.static(path.join(__dirname, 'quizgiri-clientapp')));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', index);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views'));
});

//Get All Tasks
app.get('/tasks', function(req, res, next){
    console.log(db);
    db.testcollection.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});


// process.on('SIGINT', function () {
//     mongoose.connection.close(function () {
//         console.log('Mongoose disconnected on app termination');
//         process.exit(0);
//     });
// }); 

app.listen(port, () => {
    console.log(`listening on port ${port} ...... `);
});