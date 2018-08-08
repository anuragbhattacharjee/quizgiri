var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
mongoose.Promise = global.Promise;

var QuestionSchema   = new Schema({
  answer : String,
  answerOption1 : String,
  answerOption2 : String,
  answerOption3 : String,
  categoryOptionsModel : [],
  question : String,
  quiestionType : String,
  topic : Number
  
});

module.exports = mongoose.model('question', QuestionSchema);
