const express = require('express');
const router = express.Router();

// Rotas relacionadas à tabela Vendas
router.get('/', (req, res) => {
  // Obter todas as vendas
  // ...
});

router.post('/', (req, res) => {
  // Criar uma nova venda
  // ...
});

// Resto das rotas relacionadas às Vendas

module.exports = router;