var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var bannerLojaSchema = new Schema({
    
    img: String,
    

},{collection:'bannerLoja'})

var BannerLoja = mongoose.model('bannerLoja',bannerLojaSchema);

module.exports = BannerLoja;