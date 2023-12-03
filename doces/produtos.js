var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtosSchema = new Schema({
    
    img: String,
    nome: String,
    valor: Number,
    slug: String,
    

},{collection:'produtos'})

var Produtos = mongoose.model('produtos',produtosSchema);

module.exports = Produtos;