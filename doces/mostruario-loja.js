var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var mostruarioLojaSchema = new Schema({
    
    img: String,
    

},{collection:'mostruario_loja'})

var MostruarioLoja = mongoose.model('mostruario_loja',mostruarioLojaSchema);

module.exports = MostruarioLoja;