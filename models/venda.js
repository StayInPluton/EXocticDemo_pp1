const { Sequelize, DataTypes } = require('sequelize');
const Usuario = require('./usuario');
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
const Vendas = sequelize.define('Venda', {
  id_venda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  contato: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  id_experiencia: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Usuario,
      key: 'id_usuario'
    }
  }
}, {
  tableName: 'Venda'
});

module.exports = Vendas;

  
 // sync das tabelas
Vendas.sync({ force: false }) 
.then(() => {
  console.log('tabela venda  criada');
})
.catch((error) => {
  console.error('Erro ao criar tabela venda', error);
});

module.exports = Vendas;
