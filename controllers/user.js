'use strict';
const base = process.env.PWD;
const User = require(base + '/models/user');

var getUser = function (req, res) {
    User.findById(req.params.id, (err, post) => {
        if (err) {
            res.send(500, err);
        }
        if (post) {
            res.status(200).json(post);
        }
    });
};

var getUsers = function (req, res) {
    //console.log("I am in get Categories");
    User.find((err, posts) => {
        if (err) {
            res.send(500, err);
        }
        res.status(200).json(posts);
    });
};


var createUser = function(req, res){
    let post = new User(req.body);
    post.save((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(result);
    });
}

// var removePost = function(req, res) {
//     Post.findByIdAndRemove(req.params.id, (err, post) => {
//       if (err) { res.send(500, err); }
//       res.json(200, {'removed': true});
//     });
//   };

module.exports = {
    getUser,     
    getUsers,
    createUser
};