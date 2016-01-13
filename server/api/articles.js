var models = require('../models');
var config = require('../config/environment');
var EventProxy = require('eventproxy');
var _ = require('lodash');
var Article = models.Article;

exports.get = function (req, res) {
	var _id = req.params._id;

	var ep = new EventProxy();
	ep.fail(function () { res.sendStatus(500); });
	ep.all('article', function (article) {
		res.json(article);
	});

	Article.findById(_id, ep.done(function (article) {
		ep.emit('article', article);
	}));
};

exports.query = function (req, res) {
	var categoryId = req.query.categoryId;
	var page = parseInt(req.query.page) || 1;
	var query = {};
	if (categoryId) query.categoryId = categoryId;
	var option = {
		skip: config.articlePageLimit * (page - 1),
		limit: config.articlePageLimit,
		sort: '-createAt'
	};
	
	var ep = new EventProxy();
	ep.fail(function () { res.sendStatus(500); });
	ep.all('articles', 'pageTotal', function (articles, pageTotal) {
		res.json({
			articles: articles,
			pageTotal: pageTotal
		});
	});

	Article.find(query, null, option, ep.done(function (articles) {
		ep.emit('articles', articles);
	}));
	Article.count(query, ep.done(function (count) {
		var pageTotal = Math.ceil(count / config.articlePageLimit);
		ep.emit('pageTotal', pageTotal);
	}));
};

exports.save = function (req, res) {
	var title = req.body.title,
		content = req.body.content,
		categoryId = req.body.categoryId;

	var article = new Article({
		title: title,
		content: content,
		categoryId: categoryId
	});
	article.save(function (err) {
		if (err) return res.sendStatus(500);
		res.json({ id: article._id });
	})
};

exports.update = function (req, res) {
	var _id = req.body._id;
	var update = {};
	['title', 'content', 'categoryId'].forEach(function (prop) {
		if (req.body[prop])
			update[prop] = req.body[prop];
	});
	var tags = req.body.tags;
	if (tags)
		update.tags = _.uniq(tags.trim().split(/(,|;|\s)+/));

	var ep = new EventProxy();
	ep.fail(function () { res.sendStatus(500); });

	Article.findOneAndUpdate({ _id: _id }, update, null, ep.done(function (article) {
		res.json({ article: article });
	}));
};

exports.delete = function (req, res) {
	var _id = req.body._id;

	var ep = new EventProxy();
	ep.fail(function () { res.sendStatus(500) });

	Article.findOneAndRemove({ _id: _id }, ep.done(function () {
		res.json({ success: true });
	}));
};