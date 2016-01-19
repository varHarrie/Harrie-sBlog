var path = require('path');
var Category=require('./models').Category;

module.exports = function (app) {
	//APIs
	app.use('/api', require('./api'));

	//partials
	app.get('/partials/*', function (req, res) {
		var view = path.join('./', req.url.split('.')[0]);
		res.render(view, function (err, html) {
			if (err) {
				console.log('Error rendering partial[' + view + ']:' + err);
				res.sendStatus(404);
			} else {
				res.send(html);
			}
		})
	});

	//background
	app.route('/backend').get(function (req, res) {
		res.render('_index');
	});


	//index
	app.route('/*').get(function (req, res) {
		res.render('index');
	});
};