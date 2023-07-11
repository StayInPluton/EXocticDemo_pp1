const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
const path = require('path');
const session = require('express-session');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
//models
const Categoria = require('./models/categoria');
const Usuario = require('./models/usuario');
const Venda = require('./models/venda');
const Experiencias = require('./models/experiencia');
const Banner = require('./models/banner');
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// dotenv
dotenv.config();

// view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(morgan('dev'));

// Configuração do middleware de sessão
app.use(session({
  secret: 'mySecretKey', // Substitua por uma chave secreta forte
  resave: false,
  saveUninitialized: false
}));

// Rotas
const categoriasRoutes = require('./routes/categoriasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const experienciasRoutes = require('./routes/experienciasRoutes');
const vendasRoutes = require('./routes/vendasRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const administracaoRoutes = require('./routes/administracaoRoutes');

// adicionando rotas
  //categorias
  app.use('/categorias', categoriasRoutes);
  //usuarios
  app.use('/usuarios', usuariosRoutes);
  //experiencias
  app.use('/experiencias', experienciasRoutes);
  //vendas
  app.use('/vendas', vendasRoutes);
  //banner
  app.use('/banner', bannerRoutes);
  //administracao
  app.use('/administracao', administracaoRoutes);

// Rota do servidor 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});
