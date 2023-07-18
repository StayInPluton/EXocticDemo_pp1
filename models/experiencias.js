const { Sequelize, DataTypes } = require('sequelize');
const Venda = require('./venda')
const Categoria = require('./categoria')
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Experiencias = sequelize.define('Experiencias', {
    id_experiencias: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    informacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    categoria: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'experiencias',
    timestamps: false
  });

 // sync das tabelas
Experiencias.sync({ force: false }) 
.then(() => {
  console.log('tabela experiencia criada');
})
.catch((error) => {
  console.error('Erro ao criar tabela experiencia', error);
});

  module.exports = Experiencias;