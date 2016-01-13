var models = require('../models');
var Category = models.Category;

exports.query = function (req, res) {
	Category.find({}, function (err, categories) {
		if (err) return res.sendStatus(500);
		res.json(categories);
	});
};