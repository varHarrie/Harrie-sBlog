var path = require('path');
var _ = require('lodash');

var all = {
	root: path.normalize(__dirname + '/../..'),
	ip: process.env.IP || '0.0.0.0',
	port: process.env.PORT || 80,
	secrets: {
		session: 'harrie'
	}
};

var mongo = {
	uri: 'mongodb://localhost:27017/harrieblog'
};

var web = {
	articlePageLimit: 8,
	replyPageLimit: 8
};

module.exports = _.merge(all, web, {
	mongo: mongo,
	options: {

	}
});