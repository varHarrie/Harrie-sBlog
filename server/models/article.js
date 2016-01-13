var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
//mongoose ref
var ArticleSchema = new Schema({
	title: { type: String },
	content: { type: String },
	categoryId: { type: ObjectId/*, ref: 'Category'*/ },
	replyCount: { type: Number, default: 0 },
	tags: { type: Array, default: [] },
	views: { type: Number, default: 0 },
	//stars: { type: Number, default: 0 },
	lastReplyAt: { type: Date },
	lastUpdateAt: { type: Date, default: new Date() },
	createAt: { type: Date, default: new Date() }
});

ArticleSchema.index({ createAt: -1 });

mongoose.model('Article', ArticleSchema);