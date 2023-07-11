const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('exoctic', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Usuario = sequelize.define('Usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
 cpf: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_telefone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'usuario'
});

// sync das tabelas
Usuario.sync({ force: false }) 
  .then(() => {
    console.log('tabela usuario criada');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela usuario', error);
  });


module.exports = Usuario;
