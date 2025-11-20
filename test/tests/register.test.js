const chai = require("chai");
const expect = chai.expect;
const api = require("../helpers/api");
const { generateUniqueEmail } = require("../helpers/email");
const registerData = require("../fixtures/register.json");

describe("Registro de Usuário", () => {
  it("deve registrar usuário inexistente com dados válidos", async () => {
    const user = { ...registerData[0], email: generateUniqueEmail() };
    const res = await api.post("/register").send(user);
    expect(res.status).to.equal(201);
  });

  it("deve falhar ao registrar usuário já cadastrado", async () => {
    const user = { ...registerData[1] };
    await api.post("/register").send(user); // garante que existe
    const res = await api.post("/register").send(user);
    expect(res.status).to.equal(409);
  });

  it("deve falhar ao registrar usuário sem campos obrigatórios", async () => {
    const user = { ...registerData[2] };
    const res = await api.post("/register").send(user);
    expect(res.status).to.equal(400);
  });

  it("deve falhar ao registrar usuário com senha inválida", async () => {
    const user = {
      ...registerData[3],
      email: generateUniqueEmail("usuarioInvalido"),
    };
    const res = await api.post("/register").send(user);
    expect(res.status).to.equal(400);
  });
});
