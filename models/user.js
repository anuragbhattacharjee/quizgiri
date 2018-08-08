var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var UserSchema   = new Schema({
    name: String,
    phone: Number,
    email: String,
    gender: String,
    birthdate: Date,
    fb_id: String,
    google_id: String,
    password: String,
    image_url: String,
    location: String,
    about_me: String
});

module.exports = mongoose.model('user', UserSchema);
