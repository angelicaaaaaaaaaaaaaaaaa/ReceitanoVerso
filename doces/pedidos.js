var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pedidosSchema = new Schema({
    
  
    produto: String,
    nome: String,
    numero: Number,
    pg: String,
    qtd: String,
    valor: String,
    rua: String,
    num: String,
    bairro: String,
    

},{collection:'pedidos'})

var Pedidos = mongoose.model('pedidos',pedidosSchema);

module.exports = Pedidos;