const Usuario = require("../models/usuario");

exports.getTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter os usuários.");
  }
};

exports.cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, cpf, numero_telefone, nascimento } = req.body;

  try {
    const usuario = await Usuario.create({
      nome,
      email,
      senha,
      cpf,
      numero_telefone,
      nascimento,
    });
    console.log(usuario);
    res.send("Usuário cadastrado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o usuário.");
  }
};

exports.getUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      console.log(usuario);
      res.json(usuario);
    } else {
      res.status(404).send("Usuário não encontrado.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter o usuário.");
  }
};

exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, cpf, numero_telefone, nascimento } = req.body;

  try {
    const [result] = await Usuario.update(
      {
        nome,
        email,
        senha,
        cpf,
        numero_telefone,
        nascimento,
      },
      { where: { id_usuario: id } }
    );

    if (result === 1) {
      console.log(result);
      res.send("Usuário atualizado com sucesso.");
    } else {
      res.status(404).send("Usuário não encontrado.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar o usuário.");
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Usuario.destroy({ where: { id_usuario: id } });

    if (result === 1) {
      res.send("Usuário excluído com sucesso.");
    } else {
      res.status(404).send("Usuário não encontrado.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao excluir o usuário.");
  }
};
