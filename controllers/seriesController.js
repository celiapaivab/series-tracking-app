const { users, series } = require("../model/db");
const { generateToken } = require("../middleware/auth");
const bcrypt = require("bcryptjs");

// Registro de usuário
exports.register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Campos obrigatórios" });
  if (users.find((u) => u.email === email))
    return res.status(409).json({ error: "E-mail já cadastrado" });
  if (
    password.length < 8 ||
    !/[a-zA-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return res
      .status(400)
      .json({
        error:
          "Senha deve conter no mínimo 8 caracteres, incluindo letras e números",
      });
  }
  const hash = bcrypt.hashSync(password, 8);
  const user = { id: users.length + 1, email, password: hash };
  users.push(user);
  return res.status(201).json({ message: "Usuário registrado com sucesso" });
};

// Login de usuário
exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: "Senha incorreta" });
  const token = generateToken(user);
  return res.json({ token });
};

// Registro de série
exports.createSeries = (req, res) => {
  const { nome, dataInicio, status } = req.body;
  if (!nome || !dataInicio || !status)
    return res.status(400).json({ error: "Campos obrigatórios" });
  if (!["Não Iniciada", "Assistindo", "Finalizada"].includes(status))
    return res.status(400).json({ error: "Status inválido" });
  const serie = {
    id: series.length + 1,
    userId: req.user.id,
    nome,
    dataInicio,
    dataTermino: null,
    status,
  };
  series.push(serie);
  return res.status(201).json(serie);
};

// Atualizar série
exports.updateSeries = (req, res) => {
  const { id } = req.params;
  const serie = series.find((s) => s.id == id && s.userId === req.user.id);
  if (!serie) return res.status(404).json({ error: "Série não encontrada" });
  const { nome, dataInicio, dataTermino, status } = req.body;
  if (status && status === "Finalizada" && !dataTermino) {
    return res
      .status(400)
      .json({ error: "Data de término obrigatória para status Finalizada" });
  }
  if (nome) serie.nome = nome;
  if (dataInicio) serie.dataInicio = dataInicio;
  if (dataTermino) serie.dataTermino = dataTermino;
  if (status) serie.status = status;
  return res.json(serie);
};

// Listar séries do usuário
exports.listSeries = (req, res) => {
  const userSeries = series
    .filter((s) => s.userId === req.user.id)
    .sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio));
  return res.json(userSeries);
};

// Deletar série
exports.deleteSeries = (req, res) => {
  const { id } = req.params;
  const idx = series.findIndex((s) => s.id == id && s.userId === req.user.id);
  if (idx === -1)
    return res.status(404).json({ error: "Série não encontrada" });
  series.splice(idx, 1);
  return res.json({ message: "Série deletada com sucesso" });
};
