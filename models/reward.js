  
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var RewardSchema   = new Schema({
    user_id: String,
    gem: Number,
    coin: Number,
    level: Number,
    total_earned: Number,
    total_games: Number,
});

module.exports = mongoose.model('reward', RewardSchema);
