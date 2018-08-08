'use strict';

const base = process.env.PWD;
const Admin = require(base + '/models/admin');

  var getAdmins = function(req, res) {
    Admin.find((err, posts) => {
          if (err) { res.send(500, err); }
          res.status(200).json(posts);
      });
  };

  var createAdmin = function(req, res) {
    let post = new Admin(req.body);
    console.log(post);
    post.save((err, post) => {
        if (err) { res.status(500).json(err); }
        res.status(200).json(post);
    });
  };


  module.exports = {
    getAdmins,
    createAdmin
  };