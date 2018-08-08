var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var CategorySchema   = new Schema({
    _id : Number,
    name: String
});

module.exports = mongoose.model('category', CategorySchema);
