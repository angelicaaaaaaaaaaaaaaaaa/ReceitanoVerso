var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var sobreSchema = new Schema({
    
    sobre: String,
    

},{collection:'sobre'})

var Sobre = mongoose.model('',sobreSchema);

module.exports = Sobre;