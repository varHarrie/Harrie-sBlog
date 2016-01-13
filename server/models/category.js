var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: { type: String },
	createAt: { type: Date, default: new Date() }
});

mongoose.model('Category',CategorySchema);