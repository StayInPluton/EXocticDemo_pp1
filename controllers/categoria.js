const Categoria = require("../models/categoria");

exports.getTodasCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    console.log(categorias);
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter as categorias.");
  }
};

exports.cadastrarCategoria = async (req, res) => {
  const { nome, id_banner } = req.body;

  try {
    const categoria = await Categoria.create({ nome, id_banner });
    console.log(categoria);
    res.send("Categoria cadastrada com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar a categoria.");
  }
};

exports.getCategoriaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      console.log(categoria);
      res.json(categoria);
    } else {
      res.status(404).send("Categoria não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter a categoria.");
  }
};

exports.atualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome, id_banner } = req.body;

  try {
    const [result] = await Categoria.update(
      { nome, id_banner },
      { where: { id_categoria: id } }
    );

    if (result === 1) {
      console.log(result);
      res.send("Categoria atualizada com sucesso.");
    } else {
      res.status(404).send("Categoria não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar a categoria.");
  }
};

exports.deletarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Categoria.destroy({ where: { id_categoria: id } });

    if (result === 1) {
      res.send("Categoria excluída com sucesso.");
    } else {
      res.status(404).send("Categoria não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir a categoria.");
  }
};
