const express = require('express');
const router = express.Router();

// Rotas relacionadas à tabela Administração
router.get('/', (req, res) => {
  // Obter todas as administrações
  // ...
});

router.post('/', (req, res) => {
  // Criar uma nova administração
  // ...
});

// Resto das rotas relacionadas às Administrações

module.exports = router;
