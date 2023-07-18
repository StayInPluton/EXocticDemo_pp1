const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Categoria = sequelize.define('Categorias', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(30),
    allowNull: true
  },

}, {
  tableName: 'categoria',
  timestamps: false
});

// sync das tabelas
Categoria.sync({ force: true }) 
  .then(() => {
    console.log('tabela categoria criada');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela categoria', error);
  });

module.exports = Categoria;
