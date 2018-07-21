const express = require("express");
var router = express.Router();
const app = express();
var mongojs = require('mongojs');

const port = process.env.port || 5000;

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://anurag:quizgiri@cluster0-3b5xj.mongodb.net/test?retryWrites=true";

var db = mongojs("mongodb://anurag:anurag09@ds145921.mlab.com:45921/quizgiri", ['testcollection']);

var mydb;
 
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

// MongoClient.connect(uri, function (err, client) {
//     if (err) console.log("Some error has occured : ", err);
//     mydb = client.db("quizgiri")


//     mydb.collection('testcollection').find({}).toArray((err, arr) => {
//         console.log(arr);
//     });
// });



// app.get('/', (req, res) => {
//     mydb.collection('testcollection').find({}).toArray((err, arr) => {
//         if (err) {
//             res.send(err)
//         }
//         //let str = `name: ${arr.name}`;
//         res.send(arr[0].name);
//     });

// });

// app.get('/', (req, res) => { 
//     collection.find((err, tasks) => {
//         if(err){
//             res.send(err)
//         }
//         console.log(tasks)
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