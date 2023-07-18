const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
// Rota de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
  
    // Consultar o banco de dados para encontrar um usuário com o email fornecido
    const usuario = await Usuario.findOne({
      attributes: ['email', 'senha'],
      where: { email },
    });
  
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
  
    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    if (senha !== usuario.senha) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
  
    // Login bem-sucedido
    res.json({ message: 'Login realizado com sucesso!' });
  });
  module.exports = router
  