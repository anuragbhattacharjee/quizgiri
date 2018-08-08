'use strict';
const base = process.env.PWD;
const Category = require(base + '/models/category');
const Topic = require(base + '/models/topic');

var getCategory = function (req, res) {
    Category.findById(req.params.id, (err, post) => {
        if (err) {
            res.send(500, err);
        }
        if (post) {
            res.status(200).json(post);
        }
    });
};

var getCategorys = function (req, res) {
    //console.log("I am in get Categories");
    Category.find((err, posts) => {
        if (err) {
            res.send(500, err);
        }
        res.status(200).json(posts);
    });
};

var getTopicsInCatgories = function (req, res) {
    Category.aggregate([
        {
            $lookup: {
                from: "topics",
                localField: "_id",
                foreignField: "category_id",
                as: "topics"
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

var createCategory = function(req, res){
    let post = new Category(req.body);
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
    getCategory,     
    getCategorys,
    getTopicsInCatgories,
    createCategory
};