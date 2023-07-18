const express = require('express');
const router = express.Router();
const Administracao = require('../models/administracao');

// Route to get all administrators
router.get('/administradores', (req, res) => {
  Administracao.findAll()
    .then((administradores) => {
      console.log(administradores);
      res.json(administradores);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter os administradores.');
    });
});

// Route to create a new administrator
router.post('/administradores', (req, res) => {
  const { nomel, email, senha } = req.body;

  Administracao.create({ nomel, email, senha })
    .then((administrador) => {
      console.log(administrador);
      res.send('Administrador cadastrado com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar o administrador.');
    });
});

// Route to get an administrator by ID
router.get('/administradores/:id', (req, res) => {
  const { id } = req.params;

  Administracao.findByPk(id)
    .then((administrador) => {
      if (administrador) {
        console.log(administrador);
        res.json(administrador);
      } else {
        res.status(404).send('Administrador não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter o administrador.');
    });
});

// Route to update an administrator by ID
router.put('/administradores/:id', (req, res) => {
  const { id } = req.params;
  const { nomel, email, senha } = req.body;

  Administracao.update(
    { nomel, email, senha },
    { where: { id_administracao: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send('Administrador atualizado com sucesso.');
      } else {
        res.status(404).send('Administrador não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao atualizar o administrador.');
    });
});

// Route to delete an administrator by ID
router.delete('/administradores/:id', (req, res) => {
  const { id } = req.params;

  Administracao.destroy({ where: { id_administracao: id } })
    .then((result) => {
      if (result === 1) {
        res.send('Administrador excluído com sucesso.');
      } else {
        res.status(404).send('Administrador não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao excluir o administrador.');
    });
});

module.exports = router;
