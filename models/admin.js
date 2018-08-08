var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var AdminSchema   = new Schema({
    firstname : String,
    lastname: String,
    username: String,
    password: String
});

module.exports = mongoose.model('admin', AdminSchema);
