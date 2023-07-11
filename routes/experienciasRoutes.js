const express = require('express');
const router = express.Router();


router.post('/cadastroExperiencia', (req, res) => {
  // Criar uma nova experiência
  // ...
  app.post('/cadastroProduto',urlencodedParser, (req, res) => {
	var valorRecebido = req.body.valor;
	var nomeRecebido = req.body.nome;
	var fotoRecebida = req.body.foto;
	var qtdEstoqueRecebido = req.body.qtdEstoque;
	var detalhesRecebidos = req.body.detalhes;
	
	var mensagem = Produto.insereProduto(valorRecebido,nomeRecebido,fotoRecebida,qtdEstoqueRecebido,detalhesRecebidos);
	
	res.send(mensagem);
	
})
});

// Resto das rotas relacionadas às Experiências

module.exports = router;
