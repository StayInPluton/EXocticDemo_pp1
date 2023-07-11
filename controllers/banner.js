const Banner = require("../models/banner");

exports.getTodosBanners = (req, res) => {
  Banner.findAll()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter os banners.");
    });
};

exports.cadastrarBanner = (req, res) => {
  const { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias } = req.body;

  Banner.create({ descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias })
    .then((result) => {
      console.log(result);
      res.send("Banner cadastrado com sucesso.");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao cadastrar o banner.");
    });
};

exports.getBannerPorId = (req, res) => {
  const { id } = req.params;

  Banner.findByPk(id)
    .then((result) => {
      if (result) {
        console.log(result);
        res.json(result);
      } else {
        res.status(404).send("Banner não encontrado.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao obter o banner.");
    });
};

exports.atualizarBanner = (req, res) => {
  const { id } = req.params;
  const { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias } = req.body;

  Banner.update(
    { descricao, url, preco, id_administracao, Categoria_id_categoria, Experiencias_id_experiencias },
    { where: { id_banner: id } }
  )
    .then((result) => {
      if (result[0] === 1) {
        console.log(result);
        res.send("Banner atualizado com sucesso.");
      } else {
        res.status(404).send("Banner não encontrado.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao atualizar o banner.");
    });
};

exports.deletarBanner = (req, res) => {
  const { id } = req.params;

  Banner.destroy({ where: { id_banner: id } })
    .then((result) => {
      if (result === 1) {
        res.send("Banner excluído com sucesso.");
      } else {
        res.status(404).send("Banner não encontrado.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erro ao excluir o banner.");
    });
};
