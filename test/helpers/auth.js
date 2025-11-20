const api = require("./api");
let jwtToken;

async function authenticate() {
  if (!jwtToken) {
    const user = {
      email: "usuarioValido@teste.com",
      password: "senhaValida123",
    };
    // Tenta criar o usuário antes de logar
    try {
      await api.post("/register").send(user);
    } catch (e) {
      // Ignora erro se já existe
    }
    const res = await api.post("/login").send(user);
    jwtToken = res.body.token;
  }
  return jwtToken;
}

module.exports = {
  getToken: authenticate,
};
