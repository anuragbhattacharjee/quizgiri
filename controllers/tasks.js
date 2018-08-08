'use strict';

const base = process.env.PWD;
const Task = require(base + '/models/task');

  var getTasks = function(req, res) {
    //console.log("In get tasks");
    console.log(Task);
    Task.find((err, posts) => {
          if (err) { res.send(500, err); }
          res.status(200).json(posts);
      });
  };

  module.exports = {
    getTasks
  };