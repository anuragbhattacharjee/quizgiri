'use strict';
const base = process.env.PWD;
const Reward = require(base + '/models/reward');

var getReward = function (req, res) {
    Reward.findById(req.params.id, (err, post) => {
        if (err) {
            res.send(500, err);
        }
        if (post) {
            res.status(200).json(post);
        }
    });
};

var getRewards = function (req, res) {
    //console.log("I am in get Categories");
    Reward.find((err, posts) => {
        if (err) {
            res.send(500, err);
        }
        res.status(200).json(posts);
    });
};


var createReward = function(req, res){
    let post = new Reward(req.body);
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
    getReward,     
    getRewards,
    createReward
};