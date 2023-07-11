const Experiencias = require("../models/experiencia");

exports.getTodasExperiencias = (req, res) => {
  Experiencias.findAll()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter todas as experiências.");
    });
};

exports.cadastrarExperiencia = (req, res) => {
  const {
    nome,
    codigo_de_venda,
    informacoes,
    preco,
    Experienciascol,
    id_categoria,
    Venda_id_venda,
  } = req.body;

  Experiencias.create({
    nome,
    codigo_de_venda,
    informacoes,
    preco,
    experienciascol,
    id_categoria,
    Venda_id_venda,
  })
    .then((result) => {
      console.log(result);
      res.send("Experiência cadastrada com sucesso.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao cadastrar a experiência.");
    });
};

exports.getExperienciaPorId = (req, res) => {
  const { id } = req.params;

  Experiencias.findByPk(id)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter a experiência por ID.");
    });
};

exports.atualizarExperiencia = (req, res) => {
  const { id } = req.params;
  const {
    nome,
    codigo_de_venda,
    informacoes,
    preco,
    experienciascol,
    id_categoria,
    Venda_id_venda,
  } = req.body;

  Experiencias.update(
    {
      nome,
      codigo_de_venda,
      informacoes,
      preco,
      experienciascol,
      id_categoria,
      Venda_id_venda,
    },
    { where: { id_experiencias: id } }
  )
    .then((result) => {
      console.log(result);
      res.send("Experiência atualizada com sucesso.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao atualizar a experiência.");
    });
};

exports.deletarExperiencia = (req, res) => {
  const { id } = req.params;

  Experiencias.destroy({ where: { id_experiencias: id } })
    .then(() => {
      res.send("Experiência excluída com sucesso.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao deletar a experiência.");
    });
};
