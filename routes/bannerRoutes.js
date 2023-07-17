const express = require('express');
const router = express.Router();
const Banner = require('../models/banner');

// Route to get all banners
router.get('/banners', (req, res) => {
  Banner.findAll()
    .then((banners) => {
      console.log(banners);
      res.json(banners);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter os banners.');
    });
});

// Route to create a new banner
router.post('/banners', (req, res) => {
  const { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias } = req.body;

  Banner.create({ descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias })
    .then((banner) => {
      console.log(banner);
      res.send('Banner cadastrado com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar o banner.');
    });
});

// Route to get a banner by ID
router.get('/banners/:id', (req, res) => {
  const { id } = req.params;

  Banner.findByPk(id)
    .then((banner) => {
      if (banner) {
        console.log(banner);
        res.json(banner);
      } else {
        res.status(404).send('Banner não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao obter o banner.');
    });
});

// Route to update a banner by ID
router.put('/banners/:id', (req, res) => {
  const { id } = req.params;
  const { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias } = req.body;

  Banner.update(
    { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias },
    { where: { id_banner: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send('Banner atualizado com sucesso.');
      } else {
        res.status(404).send('Banner não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao atualizar o banner.');
    });
});

// Route to delete a banner by ID
router.delete('/banners/:id', (req, res) => {
  const { id } = req.params;

  Banner.destroy({ where: { id_banner: id } })
    .then((result) => {
      if (result === 1) {
        res.send('Banner excluído com sucesso.');
      } else {
        res.status(404).send('Banner não encontrado.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao excluir o banner.');
    });
});

module.exports = router;
