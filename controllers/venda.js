const Venda = require("../models/venda");

exports.getTodasVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    console.log(vendas);
    res.json(vendas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter as vendas.");
  }
};

exports.cadastrarVenda = async (req, res) => {
  const { contato, valor, id_experiencia, id_usuario } = req.body;

  try {
    const venda = await Venda.create({
      contato,
      valor,
      id_experiencia,
      id_usuario,
    });
    console.log(venda);
    res.send("Venda cadastrada com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar a venda.");
  }
};

exports.getVendaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const venda = await Venda.findByPk(id);
    if (venda) {
      console.log(venda);
      res.json(venda);
    } else {
      res.status(404).send("Venda não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter a venda.");
  }
};

exports.atualizarVenda = async (req, res) => {
  const { id } = req.params;
  const { contato, valor, id_experiencia, id_usuario } = req.body;

  try {
    const [result] = await Venda.update(
      {
        contato,
        valor,
        id_experiencia,
        id_usuario,
      },
      { where: { id_venda: id } }
    );

    if (result === 1) {
      console.log(result);
      res.send("Venda atualizada com sucesso.");
    } else {
      res.status(404).send("Venda não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar a venda.");
  }
};

exports.deletarVenda = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Venda.destroy({ where: { id_venda: id } });

    if (result === 1) {
      res.send("Venda excluída com sucesso.");
    } else {
      res.status(404).send("Venda não encontrada.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir a venda.");
  }
};
