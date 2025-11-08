require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const baseURL = process.env.BASE_URL;
const userLogin = require("../fixtures/userLogin.json");
const seriesUpdate = require("../fixtures/seriesUpdate.json");
const seriesCreate = require("../fixtures/seriesCreate.json");

let token;
let seriesId;

before(async function () {
  const res = await supertest(baseURL).post("/login").send(userLogin);
  token = res.body.token;
  const createRes = await supertest(baseURL)
    .post("/series")
    .set("Authorization", `Bearer ${token}`)
    .send(seriesCreate);
  seriesId = createRes.body.id;
});

describe("Atualizar Série", function () {
  it("deve atualizar série do usuário autenticado", async function () {
    const res = await supertest(baseURL)
      .put(`/series/${seriesId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(seriesUpdate);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("Finalizada");
  });

  it("deve falhar ao atualizar série sem autenticação", async function () {
    const res = await supertest(baseURL)
      .put(`/series/${seriesId}`)
      .send(seriesUpdate);
    expect(res.status).to.equal(401);
  });

  it("deve atualizar qualquer campo da série", async function () {
    const res = await supertest(baseURL)
      .put(`/series/${seriesId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ nome: "Alterada", status: "Assistindo" });
    expect(res.status).to.equal(200);
    expect(res.body.nome).to.equal("Alterada");
  });

  it("deve falhar ao alterar status para Finalizada sem data de término", async function () {
    const res = await supertest(baseURL)
      .put(`/series/${seriesId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Finalizada" });
    expect(res.status).to.equal(400);
  });
});
