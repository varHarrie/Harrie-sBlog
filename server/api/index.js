var express = require('express');
var categories = require('./categories');
var articles = require('./articles');
var router = express.Router();

/*
router.get();获取
router.post();创建
router.put();修改
router.patch();批量修改
router.delete();删除
*/

//category
router.get('/category', categories.query);

//article
router.get('/article/:_id', articles.get);
router.get('/article', articles.query);
router.post('/article', articles.save);
//router.delete('/article',articles.delete);
//router.put('/article/:_id',articles.update);

module.exports = router;