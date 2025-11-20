require("dotenv").config();
const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const baseURL = process.env.BASE_URL;
const fs = require("fs");
const path = require("path");

function loadFixture(name) {
  const filePath = path.join(__dirname, "../fixtures", name);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function generateUniqueEmail(base) {
  const timestamp = Date.now();
  const [user, domain] = base.split("@");
  return `${user}+${timestamp}@${domain}`;
}

describe("JIRA-01: Registro de Usuário", function () {
  it("Deve registrar usuário inexistente com sucesso", async function () {
    const fixture = loadFixture("registro-usuario-caso1.json");
    const input = {
      ...fixture.input,
      email: generateUniqueEmail(fixture.input.email),
    };
    const res = await request(baseURL).post("/register").send(input);
    expect(res.status).to.equal(fixture.expected.status);
    expect(res.body).to.deep.include(fixture.expected.body);
  });

  it("Deve falhar ao registrar usuário já cadastrado", async function () {
    const fixture = loadFixture("registro-usuario-caso2.json");
    const email = generateUniqueEmail(fixture.input.email);
    const input = { ...fixture.input, email };
    // Primeiro registra o usuário
    await request(baseURL).post("/register").send(input);
    // Tenta registrar novamente
    const res = await request(baseURL).post("/register").send(input);
    expect(res.status).to.equal(fixture.expected.status);
    expect(res.body).to.deep.include(fixture.expected.body);
  });

  it("Deve falhar ao registrar usuário sem campos obrigatórios", async function () {
    const fixture = loadFixture("registro-usuario-caso3.json");
    const res = await request(baseURL).post("/register").send(fixture.input);
    expect(res.status).to.equal(fixture.expected.status);
    expect(res.body).to.deep.include(fixture.expected.body);
  });

  it("Deve falhar ao registrar usuário com senha inválida", async function () {
    const fixture = loadFixture("registro-usuario-caso4.json");
    const input = {
      ...fixture.input,
      email: generateUniqueEmail(fixture.input.email),
    };
    const res = await request(baseURL).post("/register").send(input);
    expect(res.status).to.equal(fixture.expected.status);
    expect(res.body).to.deep.include(fixture.expected.body);
  });
});
