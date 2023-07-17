const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads
const path = require('path');
const Experiencias = require('../models/experiencias');
const Photo = require('../models/photo');

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
  const { nome, codigo_de_venda, informacoes, preco, experienciascol, id_categoria, Venda_id_venda } = req.body;

  Experiencias.create({ nome, codigo_de_venda, informacoes, preco, experienciascol, id_categoria, Venda_id_venda })
    .then((experiencia) => {
      console.log(experiencia);
      res.send('Experiência cadastrada com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erro ao cadastrar a experiência.');
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

// PARTE DE FOTOS
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for storing uploaded photos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`); // Set the filename for the uploaded photo
  }
});

// Set up multer upload instance
const upload = multer({ storage });

// Route for uploading a photo and associating it with an experience
router.post('/experiencias/:id/photo', upload.single('photo'), (req, res) => {
  const { id } = req.params;
  const { filename, path } = req.file;

  // Create a new photo record in the database
  Photo.create({
    url: path, // Save the file path or URL in the database
    description: req.body.description, // Get the description from the request body
    experiencias_id: id // Associate the photo with the specified experience
  })
    .then((photo) => {
      console.log(photo);
      res.send('Photo uploaded and associated with experience successfully.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error uploading photo.');
    });
});



module.exports = router;
