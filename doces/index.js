const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileupload = require('express-fileupload')
const path = require('path');
const { fstat } = require('fs')
mongoose.set('strictQuery', false);

const app = express();

const MostruarioLoja =  require('./mostruario-loja.js')
const BannerLoja =  require('./bannerLoja.js')
const Sobre =  require('./sobre.js')
const Feedback =  require('./feedbacks.js')
const Produtos =  require('./produtos.js')
const Pedidos =  require('./pedidos.js')

var session = require('express-session');
const fileUpload = require('express-fileupload');
///////////////////////////////PkpANocvrY8M1OSd/////////////////////////// conexao com o mongo
mongoose.connect('mongodb+srv://davidbatistaa1:PkpANocvrY8M1OSd@cluster0.cb7zhkh.mongodb.net/angelica?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('\n BANCO DE DADOS CONECTADO \n')
}).catch(function(err){
    console.log(err.message)
})
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////use body parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp')
}))
//////////////////////////////////////////////////////////

app.use(session({secret: 'keyboard cat', cookie: {maxAgre: 60000}}))


//////////////////////////////////////////////////////////receita padrao
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));
//////////////////////////////////////////////////////////


app.get('/',(req,res)=>{
    
    
        MostruarioLoja.find({}).sort({'_id': -1}).exec(function(err,mostruarioLoja){
            //console.log(posts[0])
            mostruarioLoja = mostruarioLoja.map(function(val){
                return{
                    img: val.img,
                }
            })

        
            BannerLoja.find({}).sort({'_id': -1}).exec(function(err,bannerLoja){
                //console.log(posts[0])
                bannerLoja = bannerLoja.map(function(val){
                    return{
                        img: val.img,
                    }
                })
    
            
                
                Sobre.find({}).sort({'_id': -1}).exec(function(err,sobre){
                    //console.log(posts[0])
                    sobre = sobre.map(function(val){
                        return{
                            sobre: val.sobre,
                        }
                    })
        
                
                    
                    Feedback.find({}).sort({'_id': -1}).exec(function(err,feedbacks){
                        //console.log(posts[0])
                        feedbacks = feedbacks.map(function(val){
                            return{
                                nome: val.nome,
                                texto: val.texto,
                            }
                        })

                        Produtos.find({}).sort({'_id': -1}).exec(function(err,produtos){
                            //console.log(posts[0])
                            produtos = produtos.map(function(val){
                                return{
                                    img: val.img,
                                    nome: val.nome,
                                    valor: val.valor,
                                    slug: val.slug,
                                }
                            })
                    
                    
                            res.render('home',{produtos:produtos,mostruarioLoja:mostruarioLoja, bannerLoja:bannerLoja, sobre:sobre, feedbacks:feedbacks});
                        // res.render('home',{});
                    })
            
                    
                        
                        // res.render('home',{mostruarioLoja:mostruarioLoja, bannerLoja:bannerLoja, sobre:sobre, feedbacks:feedbacks});
                    })

                })
                
            })
            
        })
    

  
});
/////////////////////////////////////
app.get('/produtos',(req,res)=>{
    if(req.query.busca == null){

        Produtos.find({}).sort({'_id': -1}).exec(function(err,produtos){
            //console.log(posts[0])
            produtos = produtos.map(function(val){
                return{
                    img: val.img,
                    nome: val.nome,
                    valor: val.valor,
                    slug: val.slug,
                }
            })
    
    
            res.render('produtos',{produtos:produtos});
        // res.render('home',{});
    })
}else{
        res.render('/busca',{});
        
    }
})

app.get('/page/contato',(req,res)=>{
    
        res.render('contato');
        
   
})


app.get('/:slug', (req, res) => {
    Produtos.findOne({slug: req.params.slug}, (err, resposta) => {
        if (err || !resposta) {
            console.error('Erro ao buscar produto:', err);
            return res.status(404).send('Produto não encontrado');
        }
        console.log(resposta)
        res.render('pedido', {produto: resposta});
    });
});

app.get('/adm/pedido', (req, res) => {

    Pedidos.find({}).sort({'_id': -1}).exec(function(err,pedidos){
        //console.log(posts[0])
        pedidos = pedidos.map(function(val){
            return{
                produto: val.produto,
                nome: val.nome,
                numero: val.numero,
                pg: val.pg,
                qtd: val.qtd,
                valor: val.valor,
                rua: val.rua,
                num: val.num,
                bairro: val.bairro,
            }
        })


        res.render('adm-pedido',{pedidos:pedidos});
    // res.render('home',{});
})
    // res.render('adm-pedido', {});               
});


    // res.render('adm-pedido', {});               

app.post('/pedido/cadastro',(req,res)=>{
 
    Pedidos.create({
        produto: req.body.produto,
        nome: req.body.nome,
        numero: req.body.numero,
        pg: req.body.pg,
        qtd: req.body.qtd,
        valor: req.body.valor,
        rua: req.body.rua,
        num: req.body.num,
        bairro: req.body.bairro,
    })
    res.redirect('/')
})


app.get('/adm/painel', (req, res) => {

    MostruarioLoja.find({}).sort({'_id': -1}).exec(function(err,mostruarioLoja){
        //console.log(posts[0])
        mostruarioLoja = mostruarioLoja.map(function(val){
            return{
                img: val.img,
            }
        })
        
        Produtos.find({}).sort({'_id': -1}).exec(function(err,produtos){
            //console.log(posts[0])
            produtos = produtos.map(function(val){
                return{
                    img: val.img,
                    nome: val.nome,
                    valor: val.valor,
                    slug: val.slug,
                }
            })
    
            res.render('adm',{mostruarioLoja:mostruarioLoja,produtos:produtos});
            //res.render('produtos',{produtos:produtos});
        // res.render('home',{});
    })
    })

    
})


app.post('/adm/cadastro',(req,res)=>{
    //proxima aula banco de dados
    // console.log(req.body)
    // console.log(req.files)
    // let formato = req.files.arquivo.name.split('.')
    var imagem = ''
    // if(formato[formato.length - 1] == "jpeg"  ){
    //     imagem = new Date().getTime()+'.jpeg'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
    // }else if( formato[formato.length - 1] == "png"){
    //     imagem = new Date().getTime()+'.png'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
        
    // }else if(formato[formato.length - 1] == "jpg"){
    //     imagem = new Date().getTime()+'.jpg'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
        
    // }else{
    //     fs.unlinkSync(req.files.arquivo.tempFilePath)

    // }
    


    MostruarioLoja.create({
       
                img: req.body.link,
            
        
    })
    res.redirect('/adm/painel')
    
})

app.post('/produto/cadastro',(req,res)=>{
    //proxima aula banco de dados
    // console.log(req.body)
    // console.log(req.files)
    // let formato = req.files.arquivo.name.split('.')
    // var imagem = ''
    // if(formato[formato.length - 1] == "jpeg"  ){
    //     imagem = new Date().getTime()+'.jpeg'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
    // }else if( formato[formato.length - 1] == "png"){
    //     imagem = new Date().getTime()+'.png'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
        
    // }else if(formato[formato.length - 1] == "jpg"){
    //     imagem = new Date().getTime()+'.jpg'
    //     req.files.arquivo.mv(__dirname+'/public/img/'+ imagem)
        
    // }else{
    //     fs.unlinkSync(req.files.arquivo.tempFilePath)

    // }
    


    
    Produtos.create({
            
                nome: req.body.nome,
                valor: req.body.valor,
                slug: req.body.slug,
                img: req.body.linkP,
            
        
    })
    res.redirect('/adm/painel')
})

// app.get('/admin/deletar/:id',(req,res)=>{
//     Posts.deleteOne({_id:req.params.id}).then(function(){
//         res.redirect('/admin/login')
//     })
// })





app.listen(5000,()=>{
    console.log('\n SERVIDOR RODANDO \n');
})