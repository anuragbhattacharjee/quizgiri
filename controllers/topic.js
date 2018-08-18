'use strict';

const base = process.env.PWD;
const Topic = require(base + '/models/topic');

var getTopic = function (req, res) {
    Topic.findById(req.params.id, (err, post) => {
        if (err) {
            res.send(500, err);
        }
        if (post) {
            res.status(200).json(posts);
        }
    });
};
 
var getTopics = function (req, res) {
    console.log("I m in get Topics");
    Topic.find((err, posts) => {
        if (err) {
            res.status(500).json(err);
        }
        res.status(200).json(posts);
    });
};
 
var getDetailsTopics = function (req, res) {
    Topic.aggregate([
        {
            $unwind: "$category_id"
        },
        {
            $lookup: 
            {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "categories"
            }
        }
        // { "$unwind": "$topics" },
    ], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        console.log(result);
        res.status(200).json(result);
    });
}

var createTopic = function(req, res){
    let post = new Topic(req.body);
    console.log(req.body);
    post.save((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        res.status(200).json(result);
    });
}

var deleteTopic = function(req, res) {
    Topic.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) { res.status(500).json(err); }
      res.status(200).json({'post': post, 'removed': true});
    });
  };

module.exports = {
    getTopic,
    getTopics,
    getDetailsTopics,
    createTopic,
    deleteTopic
};   