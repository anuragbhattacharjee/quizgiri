const express = require("express");
var  cors = require('cors');
var path = require('path');  // works with file system path
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

var index = require('./routes/index');

var db = mongojs("mongodb://anurag:anurag09@ds145921.mlab.com:45921/quizgiri", ['testcollection']);
 
//View Engine

// path to the views : 
app.set('views', path.join(__dirname,'quizgiri-clientapp/src'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder to store the angular app
app.use(express.static(path.join(__dirname, 'quizgiri-clientapp')));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', index);

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