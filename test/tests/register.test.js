require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userRegister = require("../fixtures/userRegister.json");

const invalidUser = { email: "", password: "" };
const invalidPasswordUser = { email: "newuser@example.com", password: "123" };

describe("Registro de Usuário", function () {
  it("deve registrar usuário inexistente com dados válidos", async function () {
    const res = await supertest(baseURL).post("/register").send(userRegister);
    expect([201, 409]).to.include(res.status); // 201 se novo, 409 se já existe
  });

  it("deve falhar ao registrar usuário já cadastrado", async function () {
    await supertest(baseURL).post("/register").send(userRegister); // garantir cadastro
    const res = await supertest(baseURL).post("/register").send(userRegister);
    expect(res.status).to.equal(409);
  });

  it("deve falhar ao registrar sem campos obrigatórios", async function () {
    const res = await supertest(baseURL).post("/register").send(invalidUser);
    expect(res.status).to.equal(400);
  });

  it("deve falhar ao registrar com senha inválida", async function () {
    const res = await supertest(baseURL)
      .post("/register")
      .send(invalidPasswordUser);
    expect(res.status).to.equal(400);
  });
});
