const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria');

// Route to get all categories
router.get('/categorias', (req, res) => {
  Categoria.findAll()
    .then((categorias) => {
      console.log(categorias);
      res.json(categorias);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter as categorias.');
    });
});

// Route to create a new category
router.post('/categorias', (req, res) => {
  const { nome, id_banner } = req.body;

  Categoria.create({ nome, id_banner })
    .then((categoria) => {
      console.log(categoria);
      res.send('Categoria cadastrada com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar a categoria.');
    });
});

// Route to get a category by ID
router.get('/categorias/:id', (req, res) => {
  const { id } = req.params;

  Categoria.findByPk(id)
    .then((categoria) => {
      if (categoria) {
        console.log(categoria);
        res.json(categoria);
      } else {
        res.status(404).send('Categoria não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter a categoria.');
    });
});

// Route to update a category by ID
router.put('/categorias/:id', (req, res) => {
  const { id } = req.params;
  const { nome, id_banner } = req.body;

  Categoria.update(
    { nome, id_banner },
    { where: { id_categoria: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send('Categoria atualizada com sucesso.');
      } else {
        res.status(404).send('Categoria não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao atualizar a categoria.');
    });
});

// Route to delete a category by ID
router.delete('/categorias/:id', (req, res) => {
  const { id } = req.params;

  Categoria.destroy({ where: { id_categoria: id } })
    .then((result) => {
      if (result === 1) {
        res.send('Categoria excluída com sucesso.');
      } else {
        res.status(404).send('Categoria não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao excluir a categoria.');
    });
});

module.exports = router;
