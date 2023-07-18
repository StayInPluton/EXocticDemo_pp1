const express = require('express');
const router = express.Router();
const Experiencias = require('../models/experiencias');

// Route to get all experiences
router.get('/experiencias', (req, res) => {
  Experiencias.findAll()
    .then((experiencias) => {
      console.log(experiencias);
      res.json(experiencias);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter as experiências.');
    });
});

// Route to create a new experience
router.post('/experiencias', (req, res) => {
  const { nome, informacoes, preco, categoria } = req.body;

  Experiencias.create({ nome, informacoes, preco, categoria })
    .then((experiencia) => {
      console.log(experiencia);
      res.send('Experiência cadastrada com sucesso.');
      alert('Experiência cadastrada com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar a experiência.');
      alert('Erro ao cadastrar a experiência.');
    });
});


// Route to get an experience by ID
router.get('/experiencias/:id', (req, res) => {
  const { id } = req.params;

  Experiencias.findByPk(id)
    .then((experiencia) => {
      if (experiencia) {
        console.log(experiencia);
        res.json(experiencia);
      } else {
        res.status(404).send('Experiência não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter a experiência.');
    });
});

// Route to update an experience by ID
router.put('/experiencias/:id', (req, res) => {
  const { id } = req.params;
  const { nome, codigo_de_venda, informacoes, preco, experienciascol, id_categoria, Venda_id_venda } = req.body;

  Experiencias.update(
    { nome, codigo_de_venda, informacoes, preco, experienciascol, id_categoria, Venda_id_venda },
    { where: { id_experiencias: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send('Experiência atualizada com sucesso.');
      } else {
        res.status(404).send('Experiência não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao atualizar a experiência.');
    });
});

// Route to delete an experience by ID
router.delete('/experiencias/:id', (req, res) => {
  const { id } = req.params;

  Experiencias.destroy({ where: { id_experiencias: id } })
    .then((result) => {
      if (result === 1) {
        res.send('Experiência excluída com sucesso.');
      } else {
        res.status(404).send('Experiência não encontrada.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao excluir a experiência.');
    });
});



module.exports = router;
