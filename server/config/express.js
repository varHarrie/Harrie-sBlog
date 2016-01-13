var config = require('./environment');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var express = require('express');
var path = require('path');


module.exports = function (app) {
	app.set('views', path.join(config.root, 'client', 'views'));
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser());

	app.use(session({
		secret: config.secrets.session,
		saveUninitialized: true,
		resave: false
		/*store:new mongoStore({
			mongooseConnection:mongoose.connection,
			db:'nodejs'
		})*/
	}));

	//app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
	app.use(express.static(path.join(config.root, 'client', 'public')));
};