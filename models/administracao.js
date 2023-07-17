const { Sequelize, DataTypes } = require('sequelize');
const Banner = require('./banner');
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Administracao = sequelize.define('Administracao', {
  id_administracao: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nomel: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
}, {
  tableName: 'administracao'
});

// sync das tabelas
Administracao.sync({ force: false }) 
  .then(() => {
    console.log('tabela administracao criada');
  })
  .catch((error) => {
    console.error('Erro ao criar', error);
  });

module.exports = Administracao;
