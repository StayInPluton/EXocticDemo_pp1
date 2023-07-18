const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const dotenv = require('dotenv');
const app = express();
//models
const Categoria = require('./models/categoria');
const Usuario = require('./models/usuario');
const Venda = require('./models/venda');
const Experiencias = require('./models/experiencias');
const Administracao = require('./models/administracao');
// confiurações importantes
// Sequelize
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('conectado com o banco de dados');
  })
  .catch((error) => {
    console.error('Algo deu errado ao tentar se conectar com o banco de dados:', error);
  });

// body-parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views/pages'))


//public
app.use(express.static(publicPath));
// Rotas
const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const experienciasRoutes = require('./routes/experienciasRoutes');
const vendasRoutes = require('./routes/vendasRoutes');
const administracaoRoutes = require('./routes/administracaoRoutes');
const loginRoute = require('./routes/loginRoute')

// adicionando rotas
  //categorias
  app.use('/categorias', categoriasRoutes);
  //usuarios
  app.use('/usuarios', usuariosRoutes);
  //experiencias
  app.use('/experiencias', experienciasRoutes);
  //vendas
  app.use('/vendas', vendasRoutes);
  //administracao
  app.use('/administracao', administracaoRoutes);
  //login
  app.use('/login', loginRoute);

//Rotas de acesso
  //home
  app.get('/', (req, res) => {
    res.render('home');
  });
  app.get('/detalhes', (req, res) => {
    res.render('shopDetails');
  });
  app.get('/carrinho', (req, res) => {
    res.render('shopCart');
  });
  app.get('/login-user', (req, res) => {
    res.render('loginUser');
  });
  app.get('/cadastro', (req, res) => {
    res.render('cadastro');
  });
  app.get('/cadastroexp', (req, res) => {
    res.render('cadastroExp');
  });
  
  

// Rota do servidor 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
