const Administracao = require("../models/administracao");

exports.getTodasAdministracoes = (req, res) => {
  Administracao.findAll()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter as administrações.");
    });
};

exports.cadastrarAdministracao = (req, res) => {
  const { nomel, email, senha, Banner_id_banner } = req.body;

  Administracao.create({ nomel, email, senha, Banner_id_banner })
    .then((result) => {
      console.log(result);
      res.send("Administração cadastrada com sucesso.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao cadastrar a administração.");
    });
};

exports.getAdministracaoPorId = (req, res) => {
  const { id } = req.params;

  Administracao.findByPk(id)
    .then((result) => {
      if (result) {
        console.log(result);
        res.json(result);
      } else {
        res.status(404).send("Administração não encontrada.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter a administração.");
    });
};

exports.atualizarAdministracao = (req, res) => {
  const { id } = req.params;
  const { nomel, email, senha, Banner_id_banner } = req.body;

  Administracao.update(
    { nomel, email, senha, Banner_id_banner },
    { where: { id_administracao: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send("Administração atualizada com sucesso.");
      } else {
        res.status(404).send("Administração não encontrada.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao atualizar a administração.");
    });
};

exports.deletarAdministracao = (req, res) => {
  const { id } = req.params;

  Administracao.destroy({ where: { id_administracao: id } })
    .then((result) => {
      if (result === 1) {
        res.send("Administração excluída com sucesso.");
      } else {
        res.status(404).send("Administração não encontrada.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao excluir a administração.");
    });
};
