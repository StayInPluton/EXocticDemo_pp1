const { Sequelize, DataTypes } = require('sequelize');
const Categoria = require('./categoria.js');
const Experiencias = require('./experiencia.js');
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Banner = sequelize.define('Banner', {
    id_banner: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    id_administracao: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Categoria_id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: 'id_categoria'
      }
    },
    Experiencias_id_experiencias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Experiencias,
        key: 'id_experiencias'
      }
    }
  }, {
    tableName: 'banner'
  });

  // sync das tabelas
Banner.sync({ force: false }) 
.then(() => {
  console.log('tabela banner criada');
})
.catch((error) => {
  console.error('Erro ao criar tabela banner', error);
});

  module.exports = Banner;