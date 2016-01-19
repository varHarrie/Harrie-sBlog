var models = require('../models');
var Category = models.Category;

exports.query = function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) return res.sendStatus(500);
        res.json(categories);
    });
};

exports.save = function (req, res) {
    var _id = req.body._id,
        name = req.body.name;

    var category = new Category({
        _id: _id,
        name: name
    });
    category.save(function (err) {
        if (err) return res.sendStatus(500);
        res.json({category: category});
    })
};

exports.update = function (req, res) {
    var _id = req.body._id;
    var name = req.body.name;

    var ep = new EventProxy();
    ep.fail(function () {
        res.sendStatus(500);
    });

    Category.findOneAndUpdate({_id: _id}, {name: name}, null, ep.done(function (category) {
        res.json({category: category});
    }));
};