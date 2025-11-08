require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userLogin = require("../fixtures/userLogin.json");

let token;

before(async function () {
  const res = await supertest(baseURL).post("/login").send(userLogin);
  token = res.body.token;
});

describe("Visualizar Lista de Séries", function () {
  it("deve exibir lista de séries do usuário autenticado", async function () {
    const res = await supertest(baseURL)
      .get("/series")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("não deve exibir lista para usuário não autenticado", async function () {
    const res = await supertest(baseURL).get("/series");
    expect(res.status).to.equal(401);
  });
});
