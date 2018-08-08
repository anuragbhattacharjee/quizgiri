var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var TaskSchema   = new Schema({
    name: String,
    roll: Number,
    dept: String
});

module.exports = mongoose.model('testcollection', TaskSchema);
