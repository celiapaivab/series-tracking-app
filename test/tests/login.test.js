require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userLogin = require("../fixtures/userLogin.json");

const invalidUser = {
  email: "notfound@example.com",
  password: "TestPassword123",
};
const emptyFields = { email: "", password: "" };

describe("Login de Usuário", function () {
  it("deve autenticar usuário com credenciais válidas", async function () {
    const res = await supertest(baseURL).post("/login").send(userLogin);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it.only("deve falhar ao logar usuário não registrado", async function () {
    const res = await supertest(baseURL).post("/login").send(invalidUser);
    expect(res.status).to.equal(404);
  });

  it("deve falhar ao logar sem preencher campos obrigatórios", async function () {
    const res = await supertest(baseURL).post("/login").send(emptyFields);
    expect(res.status).to.equal(400);
  });
});
