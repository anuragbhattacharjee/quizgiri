var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var TopicSchema   = new Schema({
    _id : Number,
    category_id: [], 
    name: String,
    desc: String,
    tournament: Boolean
});

module.exports = mongoose.model('topic', TopicSchema);
    