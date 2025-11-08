require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userLogin = require("../fixtures/userLogin.json");
const seriesCreate = require("../fixtures/seriesCreate.json");

const invalidSeries = { nome: "", dataInicio: "", status: "" };
const invalidStatusSeries = {
  nome: "Test",
  dataInicio: "2022-01-01",
  status: "Invalido",
};

let token;

before(async function () {
  const res = await supertest(baseURL).post("/login").send(userLogin);
  token = res.body.token;
});

describe("Registro de Série", function () {
  it("deve registrar série com dados válidos", async function () {
    const res = await supertest(baseURL)
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(seriesCreate);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("deve falhar ao registrar série sem autenticação", async function () {
    const res = await supertest(baseURL).post("/series").send(seriesCreate);
    expect(res.status).to.equal(401);
  });

  it("deve falhar ao registrar série sem campos obrigatórios", async function () {
    const res = await supertest(baseURL)
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidSeries);
    expect(res.status).to.equal(400);
  });

  it("deve falhar ao registrar série com status inválido", async function () {
    const res = await supertest(baseURL)
      .post("/series")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidStatusSeries);
    expect(res.status).to.equal(400);
  });
});
