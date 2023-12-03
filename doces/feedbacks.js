var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var feedbacksSchema = new Schema({
    
    nome: String,
    texto: String,
    

},{collection:'feedbacks'})

var Feedback = mongoose.model('feedbacks',feedbacksSchema);

module.exports = Feedback;