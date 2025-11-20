const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const loginData = require("../fixtures/login.json");

describe("Login de Usuário", () => {
  it("deve autenticar usuário com credenciais válidas", async () => {
    // Garante que o usuário está registrado antes do login
    await api.post("/register").send(loginData[0]);
    const res = await api.post("/login").send(loginData[0]);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("deve falhar ao logar usuário não registrado", async () => {
    const res = await api.post("/login").send(loginData[1]);
    expect(res.status).to.equal(404);
  });

});
