var mongoose = require('mongoose');

require('./category');
require('./article');

exports.Category = mongoose.model('Category');
exports.Article = mongoose.model('Article');