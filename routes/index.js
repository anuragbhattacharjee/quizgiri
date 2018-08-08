'use strict';

const express = require('express'),
    router = express.Router(),
    categorys = require('../controllers/category'),
    user = require('../controllers/user'),
    reward = require('../controllers/reward'),
    topics = require('../controllers/topic'),
    admin = require('../controllers/admin'),
    task = require('../controllers/tasks'),
    question = require('../controllers/question');

router.get('/categories', categorys.getCategorys);
router.get('/category/:id', categorys.getCategory);
router.get('/detailCategories', categorys.getTopicsInCatgories);
router.post('/category/create', categorys.createCategory);

router.get('/topics', topics.getTopics);
router.post('/topic/create', topics.createTopic);
router.get('/detailTopics', topics.getDetailsTopics);

router.post('/question/create', question.createQuestion);

// router.delete('/post/:id', posts.removePost);
// router.get('/post/:id', posts.getPost);
// router.put('/post/:id', posts.updatePost);

router.get('/task', task.getTasks);

router.get('/users', user.getUsers);
router.get('/user/:id', user.getUser);
router.post('/user/create', user.createUser);

router.get('/rewards', reward.getRewards);
router.get('/reward/:id', reward.getReward);
router.post('/reward/create', reward.createReward);

router.get('/admin', admin.getAdmins);
router.post('/admin/create', admin.createAdmin);


module.exports = router;