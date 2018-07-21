const express = require("express");
const app = express();

const port = process.env.port || 3000;

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://anurag:quizgiri@cluster0-3b5xj.mongodb.net/test?retryWrites=true";

var mydb;

MongoClient.connect(uri, function (err, client) {
    if (err) console.log("Some error has occured : ", err);
    mydb = client.db("quizgiri")


    mydb.collection('testcollection').find({}).toArray((err, arr) => {
        console.log(arr);
    });
});



app.get('/', (req, res) => {
    mydb.collection('testcollection').find({}).toArray((err, arr) => {
        if (err) {
            res.send(err)
        }
        //let str = `name: ${arr.name}`;
        res.send(arr[0].name);
    });

});

// app.get('/', (req, res) => { 
//     collection.find((err, tasks) => {
//         if(err){
//             res.send(err)
//         }
//         console.log(tasks)
//     });
// });

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
}); 

app.listen(port, () => {
    console.log(`listening on port ${port} ...... `);
});