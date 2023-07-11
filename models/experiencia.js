const { Sequelize, DataTypes } = require('sequelize');
const Venda = require('./venda')
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
    codigo_de_venda: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    informacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preco: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    experienciascol: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Venda_id_venda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venda,
        key: 'id_venda'
      }
    }
  }, {
    tableName: 'experiencias'
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