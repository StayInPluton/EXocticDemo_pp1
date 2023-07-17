const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Route to get all users
router.get('/usuarios', (req, res) => {
  Usuario.findAll()
    .then((usuarios) => {
      console.log(usuarios);
      res.json(usuarios);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter os usuários.');
    });
});

// Route to create a new user
router.post('/usuarios', (req, res) => {
  const { nome, email, senha, cpf, numero_telefone, nascimento } = req.body;

  Usuario.create({ nome, email, senha, cpf, numero_telefone, nascimento })
    .then((usuario) => {
      console.log(usuario);
      res.send('Usuário cadastrado com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar o usuário.');
    });
});

// Route to get a user by ID
router.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        console.log(usuario);
        res.json(usuario);
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter o usuário.');
    });
});

// Route to update a user by ID
router.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, cpf, numero_telefone, nascimento } = req.body;

  Usuario.update(
    { nome, email, senha, cpf, numero_telefone, nascimento },
    { where: { id_usuario: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send('Usuário atualizado com sucesso.');
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao atualizar o usuário.');
    });
});

// Route to delete a user by ID
router.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  Usuario.destroy({ where: { id_usuario: id } })
    .then((result) => {
      if (result === 1) {
        res.send('Usuário excluído com sucesso.');
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao excluir o usuário.');
    });
});

module.exports = router;
